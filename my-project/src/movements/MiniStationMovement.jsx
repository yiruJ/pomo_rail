import { useFrame } from "@react-three/fiber";

export function MiniStationMovement({ miniStationRef, speedRef, moveStation, setMoveStation }) {
    useFrame((_, delta) => {
        if (!moveStation) return;
        if (miniStationRef.current.isOutOfFrame()) {
            miniStationRef.current.setStationPos();
            setMoveStation(false);
        }
        const distance = speedRef.current * delta;
        miniStationRef.current.moveStation(distance);
    });

  return null;
}
