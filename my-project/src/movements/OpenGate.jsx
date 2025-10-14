import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function OpenGate({ gateRef, active, speed=0.5, target = Math.PI / 2}) {
    const rotatedRef = useRef(0);
    console.log(active);
    useFrame((_, delta) => {
        if (!active) return;
        
        const remaining = target - rotatedRef.current;
        if (remaining <= 0) return;
        
        gateRef.current?.rotateGate(speed * delta);
        rotatedRef.current += speed * delta;
    });
    return null;
}