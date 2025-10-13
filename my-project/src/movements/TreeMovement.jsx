import { useFrame } from "@react-three/fiber";

export default function TreeMovement({ speedRef, treeSetArrRef, sessionState }) {
    useFrame((_, delta) => {
        treeSetArrRef.current.forEach(treeSet => {
            treeSet.position.x += speedRef.current * delta;
        });
    })
    
    return null;
}