import { useFrame } from "@react-three/fiber";
import { SESSION } from "../constants/Sessions";

export default function HandleSession({setSessionState, sessionState, switchSessionRef}) {
  useFrame((_, delta) => {
    if (switchSessionRef.current === true) {
      setSessionState(SESSION.BREAK);
    }
  })
}