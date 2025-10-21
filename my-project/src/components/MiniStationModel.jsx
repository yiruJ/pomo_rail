import { useGLTF, useTexture } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import * as THREE from "three";
import { MODEL_LOAD } from "../constants/Models";

const MiniStationModel = forwardRef((props, ref) => {
    const { scene } = useGLTF("/models/mini_station.glb"); // put train.glb in /public/models
    const miniStationRefs = useRef([]);
    const primitiveRef = useRef();
    const textures = {
        body : useTexture("/textures/mini_station_body.webp"),
        base : useTexture("/textures/mini_station_base.webp"),
    }

    Object.values(textures).forEach((txt => {
        txt.flipY = false;
        txt.colorSpace = THREE.SRGBColorSpace; // ensures correct colors
    }))

    useEffect(() => {
        miniStationRefs.current = [];

        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.castShadow = true;
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

        scene.position.set(...MODEL_LOAD.MINI.pos);
    }, [scene])

    useImperativeHandle(ref, () => ({
        moveStation(dist) {
            primitiveRef.current.position.x += dist;
        },
        isOutOfFrame() {
            if (primitiveRef.current.position.x > 80) return true;
        },
        setStationPos() {
            const [x, y, z] = MODEL_LOAD.MINI.pos;
            if (primitiveRef.current) {
                primitiveRef.current.position.set(x, y, z);
            }
        },
        getPosition() {
            return primitiveRef.current;
        }
    }), [primitiveRef])

    return <primitive ref={primitiveRef} object={scene} {...props} />;
})

export default MiniStationModel;