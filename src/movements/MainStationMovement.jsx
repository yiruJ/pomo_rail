import { useFrame } from "@react-three/fiber";

export function MainStationMovement({ mainStationRef, speedRef, setIsVisible }) {
    useFrame((_, delta) => {
        const station = mainStationRef.current;
        if (!station) return;
            const distance = speedRef.current * delta;

        if (mainStationRef.current.isOutOfFrame()) {
            setIsVisible(prev => ({
                ...prev,
                mainStation: false,
            }));

            return;
        }
        mainStationRef.current.moveStation(distance);
    });

  return null;
}
