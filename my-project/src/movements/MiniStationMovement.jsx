import { useFrame } from "@react-three/fiber";

export function MiniStationMovement({ miniStationRef, speedRef, setIsVisible, moveStation }) {
    useFrame((_, delta) => {
        const station = miniStationRef.current;
        if (!station) return;
        if (!moveStation) return;
        // if (miniStationRef.current.isOutOfFrame()) {
        //     setIsVisible(prev => ({
        //         ...prev,
        //         miniStation: false,
        //     }));

        //     return;
        // }
        const distance = speedRef.current * delta;
        miniStationRef.current.moveStation(distance * 0.3);
    });

  return null;
}
