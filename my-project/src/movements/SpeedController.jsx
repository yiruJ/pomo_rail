import { useFrame } from "@react-three/fiber";
import { SESSION } from "../constants/Sessions";
import { useEffect, useState } from "react";

export default function SpeedController({ sessionState, speedRef }) {
    const [move, setMove] = useState(false);
    console.log(sessionState);
    useEffect(() => {
        if (sessionState === SESSION.START) {
            const delay = setTimeout(() => setMove(true), 2000);
            return () => clearTimeout(delay);
        }
    }, [sessionState]);

    useFrame((_, delta) => {
        if (!move) return;
        if ((sessionState === SESSION.START || sessionState === SESSION.PLAY)) {
            speedRef.current = Math.min(18, speedRef.current + 0.2);
        } else if (sessionState === SESSION.PAUSE_START || sessionState === SESSION.BREAK || SESSION.PAUSE_BREAK) {
            speedRef.current = Math.max(0, speedRef.current - 0.2);
        }
    });
}