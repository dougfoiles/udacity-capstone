import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddTaskModal from "./AddTaskModal";
import TaskItemList from "./TaskItemList";
import TaskBarFilter from "./TaskBarFilter";

import {
  TASK_TYPE_CONFIG,
  TASK_FILTER_TYPES,
  TASK_TYPES,
} from "./utils/constants";
import ProgressBar from "../common/ProgressBar";
import { getTaskCompletePercentage } from "./utils/taskUtils";
import { taskOrderUtil } from "../../utils/tasks/taskOrder";

const TaskBar = (props) => {
  const { tasks, taskType, goals, showProgressBar = false } = props;
  const isCheckable = taskType !== TASK_TYPES.GOAL;
  const navigate = useNavigate();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [currentTaskFilter, setCurrentTaskFilter] = useState(
    TASK_FILTER_TYPES.ACTIVE
  );
  const orderedTasks = taskOrderUtil.getTaskOrder(tasks, taskType);

  const [filteredTasks, setFilteredTasks] = useState(orderedTasks);

  const taskTypeConfig = TASK_TYPE_CONFIG[taskType];

  const percentageComplete = getTaskCompletePercentage(tasks);

  const openAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const onCloseTaskModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const onItemClick = (id) => {
    navigate(id);
  };

  const onFilterChange = (filterType) => {
    setCurrentTaskFilter(filterType);
  };

  useEffect(() => {
    if (currentTaskFilter === TASK_FILTER_TYPES.ALL) {
      setFilteredTasks(orderedTasks);
    } else {
      setFilteredTasks(
        orderedTasks.filter((task) => {
          if (currentTaskFilter === TASK_FILTER_TYPES.ACTIVE) {
            return !task.done;
          } else {
            return task.done;
          }
        })
      );
    }
    onCloseTaskModal();
  }, [tasks, currentTaskFilter]);

  return (
    <div className="task-bar">
      <div className={`progress-bar`}>
        <ProgressBar
          isDisplayed={showProgressBar}
          percentageComplete={percentageComplete}
        />
      </div>
      <div className="title">{taskTypeConfig.title}</div>
      <TaskBarFilter
        activeFilter={currentTaskFilter}
        onFilterChange={onFilterChange}
      />
      <div className="task-bar-container">
        <button onClick={openAddTaskModal}>
          {taskTypeConfig.addTaskTitle}
        </button>
        <TaskItemList
          taskList={filteredTasks}
          setTaskList={setFilteredTasks}
          onItemClick={onItemClick}
          taskType={taskType}
          isCheckable={isCheckable}
        />
      </div>
      {isAddTaskModalOpen ? (
        <AddTaskModal
          title={taskTypeConfig.addTaskTitle}
          onClose={onCloseTaskModal}
          method="POST"
          taskType={taskType}
          goals={goals}
        ></AddTaskModal>
      ) : (
        ""
      )}
    </div>
  );
};

export default TaskBar;
