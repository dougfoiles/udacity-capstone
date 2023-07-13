import { useEffect, useState } from "react";
import { START_TIMES, TIMER_MODES, getStartTime } from "./utils";
import audio from "./../../assets/bell-ring.mp3";
import Button from "../common/Button";

type Props = {
  mode: TIMER_MODES;
  disabled: boolean;
  shortBreaksTaken: number;
  onModeChange: Function;
  resetShortBreaksTaken: Function;
  incrementShortBreaksTaken: Function;
};
const Timer = (props: Props): JSX.Element => {
  const {
    mode,
    disabled,
    shortBreaksTaken,
    onModeChange,
    resetShortBreaksTaken,
    incrementShortBreaksTaken,
  } = props;

  const [secondsLeft, setSecondsLeft] = useState<number>(getStartTime(mode)); // enum
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (secondsLeft < 1) {
      const bellRing = new Audio(audio);
      bellRing.play();
      if (mode === TIMER_MODES.WORK) {
        if (shortBreaksTaken > 2) {
          onModeChange(TIMER_MODES.LONG_BREAK);
          resetShortBreaksTaken();
        } else {
          onModeChange(TIMER_MODES.SHORT_BREAK);
        }
      } else {
        if (mode === TIMER_MODES.SHORT_BREAK) {
          incrementShortBreaksTaken();
        }
        onModeChange(TIMER_MODES.WORK);
      }
    }
  }, [
    secondsLeft,
    shortBreaksTaken,
    onModeChange,
    resetShortBreaksTaken,
    incrementShortBreaksTaken,
    mode,
  ]);

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
  };

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, setSecondsLeft]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(START_TIMES[mode]);
  };
  return (
    <>
      <p>{formatTime()}</p>
      <div className="timer-buttons">
        <Button disabled={disabled} onClick={startTimer}>
          Start
        </Button>
        <Button disabled={disabled} onClick={stopTimer}>
          Stop
        </Button>
        <Button disabled={disabled} onClick={resetTimer}>
          Reset
        </Button>
      </div>
    </>
  );
};

export default Timer;
