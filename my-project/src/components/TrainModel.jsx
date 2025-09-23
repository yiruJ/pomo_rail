import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function TrainModel(props) {
    // this hook loads the .glb file
    const { scene } = useGLTF("/models/train.glb"); // put train.glb in /public/models

    const textures = {
        txt_one : useTexture("/textures/train_one.webp"),
        txt_two : useTexture("/textures/train_two.webp"),
        txt_bears : useTexture("/textures/train_bears.webp"),
    }

    Object.values(textures).forEach((txt => {
        txt.flipY = false;
        txt.colorSpace = THREE.SRGBColorSpace; // ensures correct colors
    })) 

    scene.traverse((obj) => {
        if (obj.isMesh) {
            obj.castShadow = true;
            const name = obj.name;
            if (name.includes("one") || name.includes("funnel")) {
                obj.material = new THREE.MeshStandardMaterial({
                    map: textures.txt_one,
                    toneMapped: false, // avoids washed-out colors
                });
            } else if (name.includes("two")) {
                obj.material = new THREE.MeshStandardMaterial({
                    map: textures.txt_two,
                    toneMapped: false, // avoids washed-out colors
                });
            } else if (name.includes("bears")) {
                obj.material = new THREE.MeshStandardMaterial({
                    map: textures.txt_bears,
                    toneMapped: false, // avoids washed-out colors
                });
            }
        }
    });

    return <primitive object={scene} {...props} />;
}