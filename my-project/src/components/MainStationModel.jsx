import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

const MainStationModel = forwardRef((props, ref) => {
    const { scene } = useGLTF("/models/main_station.glb"); // put train.glb in /public/models
    const gateRef = useRef(null);
    const mainStationRefs = useRef([]);
    const textures = {
        body : useTexture("/textures/main_station_body.webp"),
        base : useTexture("/textures/main_station_base.webp"),
        clockTower : useTexture("/textures/main_station_clock_tower.webp"),
    }

    // Remove once unmounted
    useEffect(() => {
        return () => {
            scene.traverse((child) => {
            if (child.isMesh) {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((m) => m.dispose());
                } else {
                    child.material.dispose();
                }
                }
            }
            });
            console.log("MainStationModel disposed manually");
        };
    }, [scene]);

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
                    toneMapped: false,
                });
            }

            // Assign textures to objects
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
                
                obj.material.needsUpdate = true;
            } else if (name.includes("body")) {
                obj.material = new THREE.MeshStandardMaterial({
                    map: textures.body,
                    toneMapped: false, 
                });
            }

            // Assign ref
            if (name === "gate") gateRef.current = obj;
            mainStationRefs.current.push(obj);
        }
    });

    useImperativeHandle(ref, () => ({
        rotateGate(rad) {
            if (!gateRef.current) return;
            gateRef.current.rotation.x -= rad;
        },
        moveStation(dist) {
            mainStationRefs.current.forEach((obj) => {
                obj.position.x -= dist;
            })
        },
        isOutOfFrame() {
            if (gateRef.current.position.x < -100) return true;
        }
    }), []);

    return <primitive object={scene} {...props}/>;
});

export default MainStationModel;