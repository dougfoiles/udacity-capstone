import { useState } from "react";
import PomodoroTasks from "./PomodoroTasks";

import "./style.scss";
import Timer from "./Timer";
import { TIMER_MODES } from "./utils";
import { breakCounter } from "./utils";
import { useSelector } from "react-redux";
import { Task } from "../../models/task-models";
import { isPomodoroState } from "../../utils/typeGuards/type-guards";

type Props = {
  tasks: Task[];
};

const Pomodoro = (props: Props): JSX.Element => {
  const { tasks } = props;
  const [timerMode, setTimerMode] = useState<TIMER_MODES>(TIMER_MODES.WORK); // Create enum
  const [shortBreaksTaken, setShortBreaksTaken] = useState<number>(
    breakCounter.getShortBreaksTaken()
  );
  const selectedItem = useSelector((state) => {
    if (isPomodoroState(state)) {
      return state.pomodoro.taskSelected;
    }

    return null;
  });

  const onModeChange = (mode: TIMER_MODES) => {
    setTimerMode(mode);
  };

  const setToWorkMode = () => {
    setTimerMode(TIMER_MODES.WORK);
  };

  const setToShortBreakMode = () => {
    setTimerMode(TIMER_MODES.SHORT_BREAK);
  };

  const setToLongBreakMode = () => {
    setTimerMode(TIMER_MODES.LONG_BREAK);
  };

  const incrementShortBreaksTaken = () => {
    setShortBreaksTaken((prev) => prev + 1);
    breakCounter.incrementShortBreaksTaken();
  };

  const resetShortBreaksTaken = () => {
    setShortBreaksTaken(0);
    breakCounter.resetShortBreaksTaken();
  };

  return (
    <>
      <div className={`pomodoro-container ${timerMode}`}>
        <div className="headers">
          <div className="mode-buttons">
            <button
              className={timerMode === TIMER_MODES.WORK ? "active" : ""}
              onClick={setToWorkMode}
              disabled={selectedItem === null}
            >
              Work
            </button>
            <button
              className={timerMode === TIMER_MODES.SHORT_BREAK ? "active" : ""}
              onClick={setToShortBreakMode}
              disabled={selectedItem === null}
            >
              Short Break
            </button>
            <button
              className={timerMode === TIMER_MODES.LONG_BREAK ? "active" : ""}
              onClick={setToLongBreakMode}
              disabled={selectedItem === null}
            >
              Long Break
            </button>
          </div>
          <div className="break-counter">{shortBreaksTaken}</div>
        </div>

        <Timer
          shortBreaksTaken={shortBreaksTaken}
          mode={timerMode}
          key={timerMode}
          onModeChange={onModeChange}
          incrementShortBreaksTaken={incrementShortBreaksTaken}
          resetShortBreaksTaken={resetShortBreaksTaken}
          disabled={selectedItem === null}
        />
      </div>
      <PomodoroTasks tasks={tasks} />
    </>
  );
};
export default Pomodoro;
