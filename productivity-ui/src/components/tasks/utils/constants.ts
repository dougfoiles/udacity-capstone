const TASK_TYPES = {
  DAILY: "DAILY",
  LONG_TERM: "LONG_TERM",
  GOAL: "GOAL",
};

const TASK_TYPE_CONFIG = {
  DAILY: {
    title: "Daily Tasks",
    addTaskTitle: "Add daily task",
  },
  LONG_TERM: {
    title: "Long Term Tasks",
    addTaskTitle: "Add long term task",
  },
  GOAL: {
    title: "Goals",
    addTaskTitle: "Add goal",
  },
};

const TASK_FILTER_TYPES = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  ALL: "ALL",
};

export { TASK_TYPES, TASK_TYPE_CONFIG, TASK_FILTER_TYPES };
