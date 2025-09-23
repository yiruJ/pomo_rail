import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function MainStationModel(props) {
    // this hook loads the .glb file
    const { scene } = useGLTF("/models/main_station.glb"); // put train.glb in /public/models

    const textures = {
        body : useTexture("/textures/main_station_body.webp"),
        base : useTexture("/textures/main_station_base.webp"),
        clockTower : useTexture("/textures/main_station_clock_tower.webp"),
    }

    Object.values(textures).forEach((txt => {
        txt.flipY = false;
        txt.colorSpace = THREE.SRGBColorSpace; // ensures correct colors
    })) 

    scene.traverse((obj) => {
        if (obj.isMesh) {
            obj.castShadow = true;
            const name = obj.name;
            if (name.includes("screen")) {
                obj.visible = false;
            } else if (name.includes("wizard")) {
                obj.material = new THREE.MeshBasicMaterial({
                    map: textures.clockTower,
                    flatShading: true,
                    toneMapped: false,
                });
            }

            if (name.includes("base") || name.includes("gate")) {
                obj.material = new THREE.MeshStandardMaterial({
                    map: textures.base,
                    toneMapped: false, // avoids washed-out colors
                });
            } else if (name.includes("clock_tower")) {
                obj.material = new THREE.MeshStandardMaterial({
                    map: textures.clockTower,
                    flatShading: true,
                    toneMapped: false,
                });
                // Ensure per-face normals (optional but helps)
                obj.material.needsUpdate = true;
            } else if (name.includes("body")) {
                obj.material = new THREE.MeshStandardMaterial({
                    map: textures.body,
                    toneMapped: false, // avoids washed-out colors
                });
            } 
        }
    });

    return <primitive object={scene} {...props} />;
}