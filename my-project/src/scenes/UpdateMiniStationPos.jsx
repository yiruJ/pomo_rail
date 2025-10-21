import { useFrame } from "@react-three/fiber";
import { MODEL_LOAD } from "../constants/Models";

export default function UpdateMiniStationPos({ miniStationRef }) {
    const [x, y, z] = MODEL_LOAD.MINI.pos;

    useFrame((_, delta) => {
        miniStationRef.current.forEach((obj) => {
            if (obj.position.x < -150) {
                obj.position.set(x, y, z);
                return;
            }
        })
    })
}