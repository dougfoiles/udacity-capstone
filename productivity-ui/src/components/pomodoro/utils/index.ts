import { breakCounter } from "./break-counter";

enum TIMER_MODES {
  WORK = "WORK",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
}

const START_TIMES = {
  WORK: 45 * 60,
  SHORT_BREAK: 10 * 60,
  LONG_BREAK: 30 * 60,
};

const getStartTime = (mode: TIMER_MODES) => {
  const keyTyped = mode as keyof typeof START_TIMES;
  return START_TIMES[keyTyped];
};

export { TIMER_MODES, START_TIMES, getStartTime, breakCounter };
