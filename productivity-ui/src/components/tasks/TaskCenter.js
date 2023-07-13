import "./style.scss";
import TaskBar from "./TaskBar";
import { TASK_TYPES } from "./utils/constants";
import { useState } from "react";

const TaskCenter = (props) => {
  const { tasks } = props;
  const [goalFilterValue, setGoalFilterValue] = useState("all");

  const goals = tasks.filter((task) => {
    return task.type === "GOAL";
  });

  const goalTasks = goals.filter((task) => {
    return goalFilterValue === "all" || task.id === goalFilterValue;
  });

  const dailyTasks = tasks.filter((task) => {
    return (
      task.type === "DAILY" &&
      (goalFilterValue === "all" || task.goalId === goalFilterValue)
    );
  });

  const longTermTasks = tasks.filter((task) => {
    return (
      task.type === "LONG_TERM" &&
      (goalFilterValue === "all" || task.goalId === goalFilterValue)
    );
  });

  const onGoalFilterChange = (event) => {
    setGoalFilterValue(event.target.value);
  };

  return (
    <div className="task-center-container">
      <div className="action-panel">
        <div className="goal-filter">
          <div className="filter-label">Filter</div>
          <select name="goal" id="goal" onChange={onGoalFilterChange}>
            <option value="all">All</option>
            {goals.map((goal) => {
              return (
                <option key={goal.id} value={goal.id}>
                  {goal.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="task-bars">
        <TaskBar
          taskType={TASK_TYPES.DAILY}
          tasks={dailyTasks}
          goals={goalTasks}
          showProgressBar={true}
        />
        <TaskBar
          taskType={TASK_TYPES.LONG_TERM}
          tasks={longTermTasks}
          goals={goalTasks}
          showProgressBar={false}
        />
        <TaskBar
          taskType={TASK_TYPES.GOAL}
          tasks={goalTasks}
          goals={goalTasks}
          showProgressBar={false}
        />
      </div>
    </div>
  );
};

export default TaskCenter;
