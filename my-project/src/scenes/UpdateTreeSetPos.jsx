import { useFrame } from "@react-three/fiber";

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTreeCoordinate() {
    const randomX = getRandomNum(-140, -250);  
    const randomZ = getRandomNum(-50, -5);  
    return [randomX, -0.2, randomZ];
}

export default function UpdateTreeSetPos({ treeSetArrRef }) {
    useFrame((_, delta) => {
        treeSetArrRef.current.forEach((treeSet) => {
            if (treeSet && treeSet.position.x >= 120) {
                const [x, y, z] = getRandomTreeCoordinate();
                treeSet.position.set(x, y, z);
            }
        });
    });
    
    return null;
}