import { useReducer } from "react";

export const TIMER = { POMO: "pomo", BREAK: "break" };
export const TIMER_CONFIG = {
  [TIMER.POMO]:  { min: 10, max: 60, step: 5, initial: 25 },
  [TIMER.BREAK]: { min:  5, max: 30, step: 5, initial:  5 },
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const initial = {
  timerType: TIMER.POMO,
  minutes: {
    [TIMER.POMO]:  TIMER_CONFIG[TIMER.POMO].initial,
    [TIMER.BREAK]: TIMER_CONFIG[TIMER.BREAK].initial,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TIMER_TYPE":
      return { ...state, timerType: action.timerType };
    case "UPDATE": {
      const cfg = TIMER_CONFIG[state.timerType];
      const delta = action.dir === "up" ? cfg.step : -cfg.step;
      const next = clamp(state.minutes[state.timerType] + delta, cfg.min, cfg.max);
      return { ...state, minutes: { ...state.minutes, [state.timerType]: next } };
    }
    default:
      return state;
  }
}

export default function handleTimer() {
  const [state, dispatch] = useReducer(reducer, initial);
  return {
    timerType: state.timerType,
    currentMinutes: state.minutes[state.timerType],
    setTimerType: (timerType) => dispatch({ type: "SET_TIMER_TYPE", timerType }),
    updateTimer: (dir) => dispatch({ type: "UPDATE", dir }),
  };
}
