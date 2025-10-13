import { AnimatePresence, motion } from "framer-motion";
import { FaHatWizard, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { TIMER } from "../constants/Timers";
import { useEffect, useState } from "react";

export default function HomeUI({  timerType, setTimerType, updateTimer, currentMinutes, onStart }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(delay);
    }, []);

    return (
    <>
      {show && (
        <>
          <div className="fixed inset-0 flex flex-col items-center w-6/12 p-[1%] mt-3">
            {/* timer types */}
            <AnimatePresence>
              <motion.div
                key="timer-type"
                className="flex justify-evenly mt-[5%] w-full"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <motion.button onClick={() => setTimerType(TIMER.POMO)}><p className="small-text scale-button" style={{ opacity: timerType === TIMER.POMO ? 1 : 0.5 }}>Pomodoro</p></motion.button>
                <motion.button onClick={() => setTimerType(TIMER.BREAK)}><p className="small-text scale-button" style={{ opacity: timerType === TIMER.BREAK ? 1 : 0.5 }}>Break</p></motion.button>
              </motion.div>
            </AnimatePresence>

            {/* timer panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key="timer-panel"
                className="timer-panel mt-[1%]"
                style={{ left: "20%", top: "12%" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col items-center gap-10 h-full justify-center">
                  <p className="medium-text">
                    {currentMinutes}
                    <span className="text-4xl"> mins</span>
                  </p>
                  <div className="flex flex-row gap-10">
                    <button onClick={() => updateTimer("up")}><FaArrowUp className="timer-controls" /></button>
                    <button onClick={() => updateTimer("down")}><FaArrowDown className="timer-controls" /></button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* start button */}
            <AnimatePresence>
              <motion.button
                key="start"
                className="page-transition-button mt-[20%] scale-button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={onStart}
              >
                Start
              </motion.button>
            </AnimatePresence>
          </div>
        </>
      )}
    </>
  );
}
