import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PomodoroPage from "./pages/PomodoroPage";
import TasksPage, { loader as tasksLoader } from "./pages/TasksPage";
import { action as manipulateTaskAction } from "./components/tasks/AddTaskModal";
import Error from "./components/common/Error";
import StatsPage from "./pages/StatsPage";
import TasksRoot from "./pages/TasksRoot";
import TaskDetailsPage, {
  loader as taskLoader,
  action as taskDetailsAction,
} from "./pages/TaskDetailsPage";
import JournalPage, {
  loader as journalLoader,
  action as journalAction,
} from "./pages/JournalPage";
import CallbackPage from "./pages/CallbackPage";
import JournalRoot from "./pages/JournalRoot";
import JournalEntryDetailsPage, {
  loader as journalEntryDetailsLoader,
  action as journalEntryDetailsAction,
} from "./pages/JournalEntryDetailsPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Auth from "./utils/auth/Auth";

function App() {
  const auth = new Auth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root auth={auth} />,
      errorElement: <Error />,
      id: "root",
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "callback",
          element: <CallbackPage auth={auth} />,
        },
        {
          path: "login",
          element: <LoginPage auth={auth} />,
        },
        {
          path: "logout",
          element: <LogoutPage auth={auth} />,
        },
        {
          path: "tasks",
          element: (
            <ProtectedRoute auth={auth}>
              <TasksRoot />
            </ProtectedRoute>
          ),
          action: manipulateTaskAction,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute auth={auth}>
                  <TasksPage />
                </ProtectedRoute>
              ),
              id: "tasks-page",
              loader: tasksLoader,
              action: manipulateTaskAction,
            },
            {
              path: ":taskId",
              element: (
                <ProtectedRoute auth={auth}>
                  <TaskDetailsPage />
                </ProtectedRoute>
              ),
              loader: taskLoader,
              action: taskDetailsAction,
            },
          ],
        },
        {
          path: "pomodoro",
          element: <PomodoroPage />,
          loader: tasksLoader,
        },
        { path: "stats", element: <StatsPage /> },
        {
          path: "journal",
          element: <JournalRoot />,
          children: [
            {
              index: true,
              element: <JournalPage />,
              action: journalAction,
              loader: journalLoader,
            },
            {
              path: ":journalEntryId",
              element: <JournalEntryDetailsPage />,
              loader: journalEntryDetailsLoader,
              action: journalEntryDetailsAction,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
