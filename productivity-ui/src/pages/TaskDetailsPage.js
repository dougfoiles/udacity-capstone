import { json, useLoaderData, redirect, useNavigation } from "react-router-dom";
import PageContent from "../components/common/PageContent";
import TaskDetails from "../components/tasks/task-details/TaskDetails";
import { getToken } from "../utils/auth/getToken.ts";
import { apiEndpoint } from "../config/config";
import store from "../store";
import LoadingCard from "../components/common/LoadingCard";

const TaskDetailsPage = () => {
  const data = useLoaderData();
  const { state } = useNavigation();

  if (state === "loading") {
    return (
      <PageContent>
        <LoadingCard />
      </PageContent>
    );
  }

  return (
    <PageContent>
      <TaskDetails task={data} />
    </PageContent>
  );
};

export async function loader({ request, params }) {
  const storeState = store.getState();
  if (!storeState.auth.isLoggedIn) {
    throw redirect("/login");
  }

  const taskId = params.taskId;
  const idToken = getToken();
  const response = await fetch(`${apiEndpoint}/tasks/${taskId}`, {
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
    const returnData = {
      creationDate: resData.item[0].createdAt.S,
      description: resData.item[0].description.S,
      done: resData.item[0].done.BOOL,
      id: resData.item[0].taskId.S,
      type: resData.item[0].type.S,
      dueDate: resData.item[0].dueDate?.S,
      goalId: resData.item[0].goalId?.S,
    };
    return returnData;
  }
}

export async function action({ params, request }) {
  const taskId = params.taskId;
  const method = request.method;
  const idToken = getToken();

  if (request.method === "DELETE") {
    const response = await fetch(`${apiEndpoint}/tasks/${taskId}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw json(
        { message: "Could not delete event." },
        {
          status: 500,
        }
      );
    }

    return redirect("/tasks");
  } else {
    const data = Object.fromEntries(await request.formData());

    const completionData = {};
    if (data.checkboxInput) {
      if (data.checkboxValue) {
        completionData.done = true;
        completionData.completionDate = new Date().toLocaleDateString();
      } else {
        completionData.done = false;
      }
    }
    const taskData = {
      dueDate: data.dueDate ? data.dueDate : undefined,
      description: data.description ? data.description : undefined,
      goalId: data.goal ? data.goal : undefined,
      done: completionData.done,
      completionDate: completionData.completionDate,
    };

    let url = `${apiEndpoint}/tasks`;

    if (method === "PATCH") {
      const taskId = params.taskId;
      url = `${apiEndpoint}/tasks/` + taskId;
    }

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

    if (data.checkboxInput !== undefined) return redirect("/tasks");

    return response;
  }
}

export default TaskDetailsPage;
