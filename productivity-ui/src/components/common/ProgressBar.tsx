import { useEffect, useState } from "react";
import "./ProgressBar.scss";

type Props = {
  percentageComplete: number;
  isDisplayed: boolean;
};

const ProgressBar = (props: Props): JSX.Element => {
  const { percentageComplete, isDisplayed } = props;

  const [currentPercentageComplete, setCurrentPercentageComplete] =
    useState(percentageComplete);

  useEffect(() => {
    if (isDisplayed) {
      const interationCount = 40;
      const iterationAmount =
        (percentageComplete - currentPercentageComplete) / interationCount;
      let currentIterations = 0;
      const interval = setInterval(() => {
        if (currentIterations <= interationCount) {
          setCurrentPercentageComplete((prev) => prev + iterationAmount);
          currentIterations++;
        } else {
          clearInterval(interval);
        }
      }, 5);
      return () => clearInterval(interval);
    }
  }, [percentageComplete, isDisplayed, currentPercentageComplete]);

  return (
    <div
      className="background-progress"
      style={!isDisplayed ? { visibility: "hidden" } : {}}
    >
      <div
        className="foreground-progress"
        style={{ width: `${currentPercentageComplete}%`, height: "100%" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
