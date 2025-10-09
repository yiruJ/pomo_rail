import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function TreeOneModel(props) {
    // this hook loads the .glb file
    const { scene } = useGLTF("/models/tree_one.glb"); // put train.glb in /public/models

    const txt = useTexture("/textures/tree_one_txt.webp");
    txt.flipY = false;
    txt.colorSpace = THREE.SRGBColorSpace; // ensures correct colors

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