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
        miniStationRef.current.moveStation(speedRef.current * delta * 0.02 );
    });

  return null;
}
