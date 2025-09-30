import { AnimatePresence, motion } from "framer-motion";

export default function TitleUI({ onStart }) {
  return (
    <>
        <motion.div
          key="title"
          className="title-text"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}
        >
          <p>Pomo<br />Rail</p>
        </motion.div>

        <motion.button
          key="go-to-timer"
          className="page-transition-button absolute right-50 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}
          onClick={onStart}
        >
          Go To Timer
        </motion.button>
    </>
  );
}
