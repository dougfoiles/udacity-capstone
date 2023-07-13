import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useSubmit } from "react-router-dom";

import { tasksActions } from "../../store";

const TaskItem = (props) => {
  const {
    onClick,
    taskItem: { id, description, dueDate, goalId, done = false },
    positionConfig: { index, totalItems },
    isCheckable = true,
  } = props;

  const dispatch = useDispatch();
  const highlightedGoal = useSelector((state) => state.tasks.highlightedGoal);
  const [isChecked, setIsChecked] = useState(done);
  const submit = useSubmit();

  const onItemClick = () => {
    removeGoalHover();
    onClick(id);
  };

  const setGoalHover = () => {
    dispatch(tasksActions.setHighlightedGoal(id));
  };

  const removeGoalHover = () => {
    dispatch(tasksActions.removeHighlightedGoal());
  };

  const onChange = () => {
    setIsChecked((prevState) => {
      return !prevState;
    });
  };

  const onCheckHandler = (event) => {
    submit(event.currentTarget, { method: "patch", action: "/tasks/" + id });
  };

  const isOverdue = Date.parse(dueDate) - Date.parse(new Date()) < -24;

  const isHighlightedGoal = goalId && goalId === highlightedGoal;

  return (
    <div
      onMouseEnter={() => setGoalHover()}
      onMouseLeave={() => removeGoalHover()}
      className={`task-item ${isOverdue ? "overdue" : ""} ${
        isHighlightedGoal ? "highlighted" : ""
      }`}
    >
      <div
        className="drag-section"
        style={{ opacity: (totalItems - index) / totalItems }}
      >
        <div className="horizontal-lines">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {isCheckable ? (
        <Form className="form" onChange={onCheckHandler}>
          <input
            type="checkbox"
            id={id}
            name="checkboxValue"
            onChange={onChange}
            checked={isChecked}
          />
          <input
            // HACK: For some reason when the checkbox's checked value is false it does not show up
            // in the onSubmit request body. So setting the default value on this input to true
            // so that when we submit the checkbox form with a false checked value we can still
            // determine it was triggered from Form
            style={{ display: "none" }}
            name="checkboxInput"
            defaultValue={true}
          />
        </Form>
      ) : (
        ""
      )}

      <div className="task-title" onClick={onItemClick}>
        <div>{description}</div>
        {dueDate && (
          <div className="due-date">{`Due ${new Date(
            dueDate
          ).toLocaleDateString()}`}</div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
