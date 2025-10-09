import { useFrame } from "@react-three/fiber";

export default function UpdateTrackSetPos({ trackSetArrRef }) {
    useFrame((_, delta) => {
        trackSetArrRef.current.forEach((trackSet) => {
            if (trackSet.position.x >= 212.5 + 225) {
                trackSet.position.x = -200.1;
                return;
            }
        })
    })
}