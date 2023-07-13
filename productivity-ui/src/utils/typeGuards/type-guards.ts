import { PomodoroStateModel } from "../../store/pomodoro";
import { TasksStateModel } from "../../store/tasks";

type DataMessage = {
  message: string;
};

function containsMessage(data: unknown): data is DataMessage {
  if (data && (data as DataMessage).message) {
    return true;
  }
  return false;
}

function isPomodoroState(state: unknown): state is PomodoroStateModel {
  if (state && (state as PomodoroStateModel).pomodoro.taskSelected) {
    return true;
  }
  return false;
}

function isTasksState(state: unknown): state is TasksStateModel {
  if (state && (state as TasksStateModel).tasks) {
    return true;
  }
  return false;
}

export { containsMessage, isPomodoroState, isTasksState };
