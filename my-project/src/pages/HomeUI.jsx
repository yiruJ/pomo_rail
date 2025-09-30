import { AnimatePresence, motion } from "framer-motion";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaHatWizard, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { TIMER } from "../hooks/handleTimer";

export default function HomeUI({ setTimerType, timerType, currentMinutes, onStart }) {
    return (
        <>
            <AnimatePresence>
                <motion.div
                    className="absolute top-16 -translate-x-3 w-full z-20 flex gap-36"
                    style={{ left: "10%"}}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                >
                    <button onClick={() => setTimerType(TIMER.POMO)}><p className="small-text">Pomodoro</p></button>
                    <button onClick={() => setTimerType(TIMER.BREAK)}><p className="small-text">Break</p></button>
                </motion.div>

                <motion.div
                    className="z-20 absolute top-10"
                    animate={{ left: timerType === TIMER.POMO ? "43%" : "55.6%" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                    <FaHatWizard className="w-6 h-6 text-white/70" />
                </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.div
                key="title-timer"
                className="timer-panel"
                style={{ left: "20%", top: "12%" }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}
                >
                <div className="flex flex-col items-center gap-10 h-full justify-center">
                    <p className="medium-text">
                    {currentMinutes}
                    <span className="text-4xl"> mins</span>
                    </p>
                    <div className="flex flex-row gap-10">
                    <button onClick={() => updateTimer("up")}><FaArrowUp className="arrow-icon" /></button>
                    <button onClick={() => updateTimer("down")}><FaArrowDown className="arrow-icon" /></button>
                    </div>
                </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}
