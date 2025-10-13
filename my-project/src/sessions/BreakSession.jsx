import { AnimatePresence, motion } from "framer-motion";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { SESSION } from "../constants/Sessions";
import { TIMER } from "../constants/Timers";

export default function BreakSession({ setTimerType, currentMinutes, onPause, onResume, sessionState, setSessionState }) {
    const [remainingMins, setRemainingMins]  = useState(currentMinutes);
    const [remainingSecs, setRemainingSecs]  = useState(0);
    
    useEffect(() => {
        if (remainingSecs === 0 && remainingMins === 0) {
            setTimerType(TIMER.POMO);
            setSessionState(SESSION.PLAY);
        } 
    }, [remainingSecs]);

    useEffect(() => {
        if (sessionState === SESSION.PAUSE_BREAK) return;

        const timer = setInterval(() => {
            if (remainingSecs === 0) {
                setRemainingMins(prev => prev - 1);
                setRemainingSecs(59);
            } else {
                setRemainingSecs(prev => prev - 1);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [remainingSecs, remainingMins, sessionState])

    return (
        <>  
            <div className="fixed inset-0 flex flex-col items-center w-6/12 p-[1%]">
                {/* timer panel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key="timer-panels"
                        className="timer-panel mt-[1%]"
                        style={{ left: "20%", top: "12%" }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}
                    >
                    <div className="flex flex-col items-center gap-10 h-full justify-center">
                        <p className="medium-text">
                            {remainingMins} : {remainingSecs < 10 ? "0" + remainingSecs : remainingSecs}
                        </p>
                        <AnimatePresence mode="wait">
                            {sessionState === SESSION.PAUSE_BREAK ? (
                                <motion.button
                                    key="resume"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={onResume}
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
