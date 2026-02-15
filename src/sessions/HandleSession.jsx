import { useRef, useState, useEffect, useCallback } from "react";
import { SESSION } from "../constants/Sessions";

export default function HandleSession({setSessionState, sessionState, switchSessionRef}) {
  useEffect(() => {
    if (switchSessionRef.current === true && (sessionState === SESSION.PLAY || sessionState === SESSION.START) ) {
      setSessionState(SESSION.BREAK);
    }

    switchSessionRef.current = false;
  }, [switchSessionRef.current])
}