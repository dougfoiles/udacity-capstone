import { useState } from "react";
import { TASK_FILTER_TYPES } from "./utils/constants";
import "./TaskBarFilter.scss";

const TaskBarFilter = (props) => {
  const { activeFilter: defaultActiveFilter, onFilterChange } = props;
  const [activeFilter, setActiveFilter] = useState(defaultActiveFilter);

  const onClickActive = () => {
    setActiveFilter(TASK_FILTER_TYPES.ACTIVE);
    onFilterChange(TASK_FILTER_TYPES.ACTIVE);
  };
  const onClickCompleted = () => {
    setActiveFilter(TASK_FILTER_TYPES.COMPLETED);
    onFilterChange(TASK_FILTER_TYPES.COMPLETED);
  };
  const onClickAll = () => {
    setActiveFilter(TASK_FILTER_TYPES.ALL);
    onFilterChange(TASK_FILTER_TYPES.ALL);
  };
  return (
    <div className="task-bar-filter">
      <p
        className={activeFilter === TASK_FILTER_TYPES.ACTIVE ? "active" : ""}
        onClick={onClickActive}
      >
        Active
      </p>
      <p
        className={activeFilter === TASK_FILTER_TYPES.COMPLETED ? "active" : ""}
        onClick={onClickCompleted}
      >
        Completed
      </p>
      <p
        className={activeFilter === TASK_FILTER_TYPES.ALL ? "active" : ""}
        onClick={onClickAll}
      >
        All
      </p>
    </div>
  );
};

export default TaskBarFilter;
