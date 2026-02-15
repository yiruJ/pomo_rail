import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useEffect } from "react";

export default function CloudModel(props) {
    const { scene } = useGLTF("/models/cloud.glb");
    const txt = useTexture("/textures/cloud.webp");
    
    txt.flipY = false;
    txt.colorSpace = THREE.SRGBColorSpace;

    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        
        clone.traverse((obj) => {
            if (obj.isMesh) {
                obj.material = new THREE.MeshBasicMaterial({
                    map: txt,
                    toneMapped: false,
                    transparent: true,    // Set here directly
                    opacity: 1.0,         // Set here directly
                });
            }
        });
        
        return clone;
    }, [scene, txt]);

    return <primitive object={clonedScene} {...props} />;
}