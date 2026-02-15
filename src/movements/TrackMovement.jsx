import { useFrame } from "@react-three/fiber";

export default function TrackMovement({ speedRef, trackSetArrRef }) {
  useFrame((_, delta) => {
    const distance = speedRef.current * delta;

        trackSetArrRef.current.forEach(trackSet => {
          trackSet.position.x += distance;
        })
    });

  return null;
}