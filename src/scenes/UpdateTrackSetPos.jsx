import { useFrame } from "@react-three/fiber";

export default function UpdateTrackSetPos({ trackSetArrRef }) {
    useFrame((_, delta) => {
        trackSetArrRef.current.forEach((trackSet) => {
            if (trackSet.position.x >= 213) {
                trackSet.position.x = -425;
                return;
            }
        })
    })
}