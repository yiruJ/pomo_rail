import { AnimatePresence, motion } from "framer-motion";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { SESSION } from "../constants/Sessions";

export default function StartSession({ timerType, setTimerType, currentMinutes, onPause, onPlay, sessionState }) {
    const [remainingMins, setRemainingMins]  = useState(currentMinutes);
    const [remainingSecs, setRemainingSecs]  = useState(0);

    function StartTimer() {
        setTimeout(() => {
            if (sessionState === SESSION.PAUSE) return;
            if (remainingMins === 0) {
                if (timerType === TIMER.BREAK) {
                    setTimerType(TIMER.POMO);
                } else {
                    setTimerType(TIMER.BREAK);
                }
            }

            if (remainingSecs === 0) {
                setRemainingMins(remainingMins - 1);
                setRemainingSecs(59);
            } else {
                setRemainingSecs(remainingSecs - 1);
            }
        }, 1000);
    }

    function openGate() {
        
    }
    
    return (
        <>  
            <StartTimer/>
            <div className="fixed inset-0 flex flex-col items-center w-6/12 p-[1%]">
                {/* timer panel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key="timer-panel"
                        className="timer-panel mt-[1%]"
                        style={{ left: "20%", top: "12%" }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}
                    >
                    <div className="flex flex-col items-center gap-10 h-full justify-center">
                        <p className="medium-text">
                            {remainingMins} : {remainingSecs < 10 ? "0" + remainingSecs : remainingSecs}
                        </p>
                        <AnimatePresence mode="wait">
                            {sessionState === SESSION.PAUSE ? (
                                <motion.button
                                    key="play"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={onPlay}
                                >
                                    <FaPlay className="timer-controls" />
                                </motion.button>
                            ) : (
                                <motion.button
                                    key="pause"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={onPause}
                                >
                                    <FaPause className="timer-controls" />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}
