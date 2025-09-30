import { AnimatePresence, motion } from "framer-motion";
import { FaHatWizard, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { TIMER } from "../hooks/handleTimer";

export default function TitleUI({ timerType, currentMinutes, setTimerType, updateTimer, onStart }) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="title-text"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
        >
          <p>Pomo<br />Rail</p>
        </motion.div>

        <motion.button
          className="start-button absolute right-50 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          onClick={onStart}
        >
          start
        </motion.button>
      </AnimatePresence>
    </>
  );
}
