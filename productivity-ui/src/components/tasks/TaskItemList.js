import { useState, useRef } from "react";

import TaskItem from "./TaskItem";
import { taskOrderUtil } from "../../utils/tasks/taskOrder";

const TaskItemList = (props) => {
  const {
    taskList,
    setTaskList,
    onItemClick,
    taskType,
    isCheckable = true,
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    if (dragItem.current === null) return;

    e.preventDefault();

    dragOverItem.current = position;
    if (dragItem.current !== dragOverItem.current) {
      setIsDragging(true);
      const items = [...taskList];
      const currentItemContent = items[dragItem.current];
      items.splice(dragItem.current, 1);
      items.splice(dragOverItem.current, 0, currentItemContent);
      dragOverItem.current = dragItem.current;
      dragItem.current = position;
      taskOrderUtil.setTaskOrder(items, taskType);
      setTaskList(items);
    }
  };

  const onDragEnd = (e) => {
    if (dragItem.current === null) return;

    dragItem.current = null;
    dragOverItem.current = null;
    setIsDragging(false);
  };

  const preventDefault = (e) => {
    if (dragItem.current === null) return;

    e.preventDefault();
  };

  const dragConfig = (index) => {
    return {
      draggable: isDragging,
      onDragStart: (e) => dragStart(e, index),
      onDragEnter: (e) => dragEnter(e, index),
      onDragEnd: (e) => onDragEnd(e),
    };
  };
  return (
    <ul
      className="list"
      onDragEnter={preventDefault}
      onDragOver={preventDefault}
    >
      {taskList.map((taskItem, index) => {
        return (
          <li
            className={`${
              isDragging && dragItem.current === index ? "hide" : ""
            }`}
            key={taskItem.id}
            draggable={true}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={(e) => onDragEnd(e)}
          >
            <TaskItem
              dragConfig={dragConfig(index)}
              positionConfig={{ index, totalItems: taskList.length }}
              taskItem={taskItem}
              onClick={onItemClick}
              isCheckable={isCheckable}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskItemList;
