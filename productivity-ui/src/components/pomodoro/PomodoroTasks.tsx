import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TASK_TYPES } from "../tasks/utils/constants";
import PomodoroTaskItem from "./PomodoroTaskItem";

import { Task } from "../../models/task-models";
import { isPomodoroState } from "../../utils/typeGuards/type-guards";
import Button from "../common/Button";

type Props = {
  tasks: Task[];
};

const PomodoroTasks = (props: Props): JSX.Element => {
  const { tasks } = props;
  const selectedItem = useSelector((state) => {
    if (isPomodoroState(state)) {
      return state.pomodoro.taskSelected;
    }
  });
  const dailyTasks = tasks.filter((task) => {
    return task.type === TASK_TYPES.DAILY && !task.done;
  });

  const longTermTasks = tasks.filter((task) => {
    return task.type === TASK_TYPES.LONG_TERM && !task.done;
  });

  const tasksExist = dailyTasks.length > 0 || longTermTasks.length > 0;
  const noTaskSelected = selectedItem === null || selectedItem === undefined;

  return (
    <div className="pomodoro-tasks-container">
      {!tasksExist && <h1>Please create task in order to use timer</h1>}
      {noTaskSelected && tasksExist && (
        <h1>Please select task in order to use timer</h1>
      )}
      <div className="task-bars">
        <div className="task-bar">
          <h2>Daily</h2>
          <ul className="list">
            {dailyTasks.map((task) => {
              return (
                <li key={task.id}>
                  <PomodoroTaskItem
                    isActive={task.id === selectedItem}
                    description={task.description}
                    id={task.id}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="task-bar">
          <h2>Longterm</h2>
          {
            <ul className="list">
              {longTermTasks.map((task) => {
                return (
                  <li key={task.id}>
                    <PomodoroTaskItem
                      isActive={task.id === selectedItem}
                      description={task.description}
                      id={task.id}
                    />
                  </li>
                );
              })}
            </ul>
          }
        </div>
      </div>
      <div className="button-panel">
        <Link className="back-button" to="../tasks">
          <Button type="submit">Go to Tasks</Button>
        </Link>
      </div>
    </div>
  );
};

export default PomodoroTasks;
