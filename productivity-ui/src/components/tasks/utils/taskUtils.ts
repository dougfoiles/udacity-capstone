import { Task } from "../../../models/task-models";

const getTaskCompletePercentage = (tasks: Task[]) => {
  const total = tasks.length;
  let numComplete = 0;
  tasks.forEach((task) => {
    if (task.done) numComplete++;
  });

  return (numComplete / total) * 100;
};

export { getTaskCompletePercentage };
