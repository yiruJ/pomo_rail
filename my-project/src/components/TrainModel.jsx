import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function TrainModel(props) {
    // this hook loads the .glb file
    const { scene } = useGLTF("/models/train.glb"); // put train.glb in /public/models

    const texture = useTexture("/textures/train_txt.webp");
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace; // ensures correct colors

    scene.traverse((obj) => {
        if (obj.isMesh) {
            const geometry = obj.geometry;
            geometry.setAttribute('uv', geometry.attributes.uv1);
            obj.geometry.computeVertexNormals();
        obj.material = new THREE.MeshBasicMaterial({
            map: texture,
            toneMapped: false, // avoids washed-out colors
        });
        }
    });

    return <primitive object={scene} {...props} />;
}