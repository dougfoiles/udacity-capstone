import Modal from "../common/Modal";
import { Form, FormMethod, json, redirect } from "react-router-dom";
import { TASK_TYPES } from "./utils/constants";
import Button from "../common/Button";
import { Goal } from "../../models/goal-models";
import { apiEndpoint } from "../../config/config";
import { getToken } from "../../utils/auth/getToken";
import { useState } from "react";

type Props = {
  onClose?: (param: any) => void;
  taskType: string;
  title: string;
  method: FormMethod;
  goals: Goal[];
};

const AddTaskModal = (props: Props): JSX.Element => {
  const [popUpContent, setPopUpContent] = useState(<></>);
  const { onClose, taskType, title, method, goals } = props;
  const shouldBlockTaskCreation =
    goals.length < 1 && taskType !== TASK_TYPES.GOAL;

  const renderPopup = () => {
    return (
      <div className="pop-up">
        A goal is required to create a task. Please create one and then come
        back.
      </div>
    );
  };
  const handleLeave = () => {
    setPopUpContent(<></>);
  };
  const handleHover = () => {
    setPopUpContent(renderPopup());
  };

  return (
    <>
      <Modal>
        <div className="add-task-modal">
          <h2>{title}</h2>
          <Form method={method} action="/tasks">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              name="description"
              required
              defaultValue={""}
            />
            {taskType === TASK_TYPES.LONG_TERM && (
              <>
                <label htmlFor="dueDate">Due Date</label>
                <input
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  required
                  defaultValue={""}
                />
              </>
            )}
            {taskType !== TASK_TYPES.GOAL && (
              <>
                <label htmlFor="goal">Associated Goal</label>
                <select name="goal" id="goal">
                  {goals.map((goal) => {
                    return <option value={goal.id}>{goal.description}</option>;
                  })}
                </select>
              </>
            )}
            <input
              id="taskType"
              name="taskType"
              type="text"
              style={{ display: "none" }}
              defaultValue={taskType}
            />
            <div
              className="actions"
              onMouseOver={() => handleHover()}
              onMouseLeave={() => handleLeave()}
            >
              <Button type="button" onClick={onClose}>
                Close
              </Button>
              <Button disabled={shouldBlockTaskCreation} type="submit">
                Add
              </Button>
              {shouldBlockTaskCreation && popUpContent}
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

//TODO use beter parameter type
export async function action(act: any) {
  const { request } = act;
  const method = request.method;
  const data = Object.fromEntries(await request.formData());
  const idToken = getToken();

  const taskData = {
    dueDate: data.dueDate ? data.dueDate : undefined,
    description: data.description ? data.description : undefined,
    type: data.taskType ? data.taskType : undefined,
    goalId: data.goal ? data.goal : undefined,
  };

  let url = `${apiEndpoint}/tasks`;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(taskData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/tasks");
}

export default AddTaskModal;
