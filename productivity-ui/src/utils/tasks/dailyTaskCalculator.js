import { TASK_TYPES } from "../../components/tasks/utils/constants";

const processDailyTasks = (tasks) => {
  const today = new Date().toLocaleDateString();
  tasks.forEach(async (task) => {
    if (
      task.type === TASK_TYPES.DAILY &&
      task.completionDate &&
      Date.parse(task.completionDate) === Date.parse(today)
    ) {
      const url = "http://localhost:8080/tasks/" + task.id;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: false,
          completionDate: null,
          amountOfDaysCompleted: (task.amountOfDaysCompleted || 0) + 1,
        }),
      });

      if (response.status === 422) {
        return response;
      }

      if (!response.ok) {
        throw new Error();
      }

      return response;
    }
  });
};

export { processDailyTasks };
