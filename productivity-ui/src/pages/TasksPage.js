import { useLoaderData, json, redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import PageContent from "../components/common/PageContent";

import TaskCenter from "../components/tasks/TaskCenter";
import store, { tasksActions } from "../store";
import { apiEndpoint } from "../config/config";
import { getToken } from "../utils/auth/getToken.ts";

const TasksPage = () => {
  const data = useLoaderData();
  const dispatch = useDispatch();
  dispatch(tasksActions.setTasks(data));

  return (
    <PageContent>
      <TaskCenter tasks={data} />
    </PageContent>
  );
};

async function loader() {
  const storeState = store.getState();
  if (!storeState.auth.isLoggedIn) {
    throw redirect("/login");
  }

  const idToken = getToken();
  const response = await fetch(`${apiEndpoint}/tasks`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch tasks." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.items.map((item) => {
      return {
        createdAt: item.createdAt.S,
        description: item.description.S,
        done: item.done.BOOL,
        id: item.taskId.S,
        type: item.type.S,
        dueDate: item.dueDate?.S,
        goalId: item.goalId?.S,
      };
    });
  }
}
export default TasksPage;

export { loader };
