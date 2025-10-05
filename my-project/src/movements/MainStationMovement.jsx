import { useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { SESSION } from "../constants/Sessions";

export function MainStationMovement({ mainStationRef, sessionState }) {
    const [move, setMove] = useState(false);
    const speedRef = useRef(0);

    useEffect(() => {
        if (sessionState === SESSION.START || sessionState === SESSION.PLAY) {
            const delay = setTimeout(() => setMove(true), 2000);
            return () => clearTimeout(delay);
        }
    }, [sessionState]);

    useFrame((_, delta) => {
        if (!move) return;
        if ((sessionState === SESSION.START || sessionState === SESSION.PLAY)) {
            speedRef.current = Math.min(6, speedRef.current + 0.04);
        } else if (sessionState === SESSION.PAUSE) {
            speedRef.current = Math.max(0, speedRef.current - 0.01);
        }

        mainStationRef.current.moveStation(speedRef.current * delta);
    });

  return null;
}
