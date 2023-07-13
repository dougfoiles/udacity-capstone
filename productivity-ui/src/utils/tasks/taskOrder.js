const itemIdentifier = "taskOrder";

const getTaskOrder = (taskList, taskType) => {
  let order = localStorage.getItem(`${taskType}-${itemIdentifier}`);
  if (order === null) {
    setTaskOrder(taskList);
    order = localStorage.getItem(itemIdentifier).split(",");
  } else {
    order = order.split(",");
  }

  return taskList.slice().sort((a, b) => {
    return order.indexOf(a.id) - order.indexOf(b.id);
  });
};

const setTaskOrder = (newTaskList, taskType) => {
  const taskIds = [];
  newTaskList.forEach((task) => {
    taskIds.push(task.id);
  });
  localStorage.setItem(`${taskType}-${itemIdentifier}`, taskIds.join(","));
};

const taskOrderUtil = {
  getTaskOrder,
  setTaskOrder,
};

export { taskOrderUtil };
