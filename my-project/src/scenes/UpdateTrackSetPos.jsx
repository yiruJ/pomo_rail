import { useFrame } from "@react-three/fiber";

export default function UpdateTrackSetPos({ trackSetArrRef }) {
    useFrame((_, delta) => {
        trackSetArrRef.current.forEach((trackSet) => {
            if (trackSet.position.x >= 159) {
                trackSet.position.x = -106;
                return;
            }
        })
    })
}