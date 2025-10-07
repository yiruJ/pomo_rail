import { useFrame } from "@react-three/fiber";

export default function TrackMovement({ speedRef, trackSetArrRef }) {
    useFrame((_, delta) => {
        trackSetArrRef.current.forEach(trackSet => {
          trackSet.position.x += speedRef.current * delta;
        })
    });

  return null;
}