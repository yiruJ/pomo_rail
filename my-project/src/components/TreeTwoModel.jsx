import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

export default function TreeTwoModel(props) {
    const { scene } = useGLTF("/models/tree_two.glb"); 

    const txt = useTexture("/textures/tree_two.webp");
    txt.flipY = false;
    txt.colorSpace = THREE.SRGBColorSpace; 

    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        
        clone.traverse((obj) => {
            if (obj.isMesh) {
                obj.material = new THREE.MeshBasicMaterial({
                    map: txt,
                    toneMapped: false, 
                });
            }
        });

        return clone;
    }, [scene, txt]);

    return <primitive object={clonedScene} {...props} />;
}