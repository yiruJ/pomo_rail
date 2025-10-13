export const TIMER = { POMO: "pomo", BREAK: "break" };

export const TIMER_CONFIG = {
  [TIMER.POMO]:  { min: 1, max: 60, step: 5, initial: 25 },
  [TIMER.BREAK]: { min:  5, max: 30, step: 5, initial:  5 },
};