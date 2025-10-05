import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function MiniStationModel(props) {
    const { scene } = useGLTF("/models/mini_train_st.glb"); // put train.glb in /public/models

    const txt = useTexture("/textures/mini_train_st_txt.webp");
    txt.flipY = false;
    txt.colorSpace = THREE.SRGBColorSpace; // ensures correct colors

    scene.traverse((obj) => {
        if (obj.isMesh) {
            obj.material = new THREE.MeshBasicMaterial({
                map: txt,
                toneMapped: false, // avoids washed-out colors
            });
        }
    });

    return <primitive object={scene} {...props} />;
}