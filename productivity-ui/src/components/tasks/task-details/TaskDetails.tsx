import "./TaskDetails.scss";

import { useState, useEffect } from "react";
import { Link, useSubmit, Form, useActionData } from "react-router-dom";
import { useSelector } from "react-redux";

import TaskDetailAttribute from "./TaskDetailAttribute";
import TaskDetailGoalsDropdown from "./TaskDetailGoalsDropdown";
import Button from "../../common/Button";

import { Task } from "../../../models/task-models";
import { TASK_TYPES } from "../utils/constants";
import { containsMessage } from "../../../utils/typeGuards/type-guards";
import { isTasksState } from "../../../utils/typeGuards/type-guards";

type Props = {
  task: Task;
};

const TaskDetails = (props: Props): JSX.Element => {
  const { task } = props;

  const goals = useSelector((state) => {
    if (isTasksState(state)) {
      return state.tasks.goals;
    }

    return [];
  });

  const data = useActionData();
  const [mode, setMode] = useState("VIEW");

  const submit = useSubmit();

  useEffect(() => {
    let message;
    if (containsMessage(data)) {
      message = data.message;
    }

    if (message) {
      setMode("VIEW");
    }
  }, [data]);

  const deleteHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  const onEdit = () => {
    setMode("EDIT");
  };

  const onCancel = () => {
    setMode("VIEW");
  };

  const viewActions = (
    <>
      <Button type="button" onClick={onEdit}>
        Edit
      </Button>
    </>
  );

  const editActions = (
    <>
      <Button className="delete-button" type="button" onClick={deleteHandler}>
        Delete
      </Button>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </>
  );

  return (
    <div className="task-details-container">
      <Link className="back-button" to="..">
        {"< Back"}
      </Link>
      <div className="task-details-card">
        <Form method="patch">
          <div className="task-details">
            <TaskDetailAttribute
              mode={mode}
              label={"Description"}
              value={task.description}
              name="description"
            />
            <TaskDetailAttribute
              mode="VIEW"
              label={"Type"}
              value={task.type}
              name="type"
            />
            {task.dueDate && (
              <TaskDetailAttribute
                mode={mode}
                label={"Due Date"}
                value={new Date(task.dueDate).toLocaleDateString()}
                name="dueDate"
                inputType="date"
              />
            )}
            {task.type !== TASK_TYPES.GOAL && (
              <TaskDetailGoalsDropdown
                label={"Goal"}
                defaultGoalId={task.goalId}
                mode={mode}
                goals={goals}
              />
            )}
            <TaskDetailAttribute
              label={"Creation Date"}
              value={task.creationDate}
              mode="VIEW"
              name="creationDate"
            />
          </div>
          <div className="actions">
            {mode === "VIEW" ? viewActions : editActions}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default TaskDetails;
