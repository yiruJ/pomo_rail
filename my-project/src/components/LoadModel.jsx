import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function TrainModel(props) {
    // this hook loads the .glb file
    const { scene } = useGLTF("/models/train.glb"); // put train.glb in /public/models

    const textures = {
        txt1 : useTexture("/textures/train_txt_1.webp"),
        txt2 : useTexture("/textures/train_txt_2.webp"),
        txt3 : useTexture("/textures/train_txt_3.webp"),
    }

    Object.values(textures).forEach((txt => {
        txt.flipY = false;
        txt.colorSpace = THREE.SRGBColorSpace; // ensures correct colors
    })) 

    scene.traverse((obj) => {
        if (obj.isMesh) {
            const name = obj.name;
            if (name.includes("first")) {
                obj.material = new THREE.MeshBasicMaterial({
                    map: textures.txt1,
                    toneMapped: false, // avoids washed-out colors
                });
            } else if (name.includes("second")) {
                obj.material = new THREE.MeshBasicMaterial({
                    map: textures.txt2,
                    toneMapped: false, // avoids washed-out colors
                });
            } else if (name.includes("third")) {
                obj.material = new THREE.MeshBasicMaterial({
                    map: textures.txt3,
                    toneMapped: false, // avoids washed-out colors
                });
            }
        }
    });

    return <primitive object={scene} {...props} />;
}