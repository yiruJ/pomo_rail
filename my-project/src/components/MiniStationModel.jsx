import { useGLTF, useTexture } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import * as THREE from "three";

const MiniStationModel = forwardRef((props, ref) => {
    const { scene } = useGLTF("/models/mini_station.glb"); // put train.glb in /public/models
    const miniStationRefs = useRef([]);

    const textures = {
        body : useTexture("/textures/mini_station_body.webp"),
        base : useTexture("/textures/mini_station_base.webp"),
    }

    Object.values(textures).forEach((txt => {
        txt.flipY = false;
        txt.colorSpace = THREE.SRGBColorSpace; // ensures correct colors
    }))

    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                const name = obj.name;
                
                if (name.includes("base")) {
                    obj.material = new THREE.MeshStandardMaterial({
                        map: textures.base,
                        toneMapped: false, // avoids washed-out colors
                    });
                } else {
                    obj.material = new THREE.MeshStandardMaterial({
                        map: textures.body,
                        toneMapped: false, // avoids washed-out colors
                    });
                }
    
                miniStationRefs.current.push(obj);
            }
        });
    }, [scene])


    useImperativeHandle(ref, () => ({
        moveStation(dist) {
            console.log(miniStationRefs.current);
            miniStationRefs.current.forEach((obj) => {
                obj.position.x -= dist;
            })
        },
        isOutOfFrame() {
            if (miniStationRefs.current[0].position.x > 100) return true;
        }
    }), [])

    return <primitive object={scene} {...props} />;
})

export default MiniStationModel;