import { AnimatePresence, motion } from "framer-motion";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

export default function HomeUI({ timerType, currentMinutes, onStart }) {
    console.log(currentMinutes);
    return (
        <AnimatePresence>
        <motion.div
            className="timer-panel"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ left: "20%", top: "5%" }}
        >   
            <div className="flex flex-col items-center gap-10 h-full justify-center">
                <p className="medium-text">{currentMinutes}</p>
            </div>
        </motion.div>
        </AnimatePresence>
    );
}
