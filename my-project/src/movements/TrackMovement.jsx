import { useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { SESSION } from "../constants/Sessions";

export default function TrackMovement({ trackRefs, sessionState }) {
    const [move, setMove] = useState(false);
    const speedRef = useRef(0);
    const trackScale = 1.5;

    useEffect(() => {
        if (sessionState === SESSION.START || sessionState === SESSION.PLAY) {
            const delay = setTimeout(() => setMove(true), 2000);
            return () => clearTimeout(delay);
        }
    }, [sessionState]);

    useFrame((_, delta) => {
        if (!move) return;
        if ((sessionState === SESSION.START || sessionState === SESSION.PLAY)) {
            speedRef.current = Math.min(18, speedRef.current + 0.1);
        } else if (sessionState === SESSION.PAUSE) {
            speedRef.current = Math.max(0, speedRef.current - 0.2);
        }
        
        trackRefs.current.forEach((track) => {
            track.position.x += speedRef.current * delta; // Divide by scale
        });
    });

  return null;
}
