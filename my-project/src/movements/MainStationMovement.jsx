import { useFrame } from "@react-three/fiber";

export function MainStationMovement({ mainStationRef, speedRef, setIsVisible }) {
    useFrame((_, delta) => {
        const station = mainStationRef.current;
        if (!station) return;

        if (mainStationRef.current.isOutOfFrame()) {
            setIsVisible(prev => ({
                ...prev,
                mainStation: false,
            }));

            return;
        }
        mainStationRef.current.moveStation(speedRef.current * delta * 0.17);
    });

  return null;
}
