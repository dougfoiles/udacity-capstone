import * as uuid from "uuid";

import { TaskItem } from "../../models/TaskItem";
import { TasksAccess } from "../dataLayer/tasksAccess";
import { CreateTaskRequest } from "../../requests/CreateTaskRequest";
import { UpdateTaskRequest } from "../../requests/UpdateTaskRequest";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Task Business Logic");

const tasksAccess = new TasksAccess();

export async function getTasksForUser(userId: string): Promise<TaskItem[]> {
  return await tasksAccess.getTasksForUser(userId);
}

export async function getTaskForUser(
  userId: string,
  taskId: string
): Promise<TaskItem[]> {
  return await tasksAccess.getTaskForUser(userId, taskId);
}

export async function createTask(
  createTaskRequest: CreateTaskRequest,
  userId: string
): Promise<TaskItem> {
  const taskId = uuid.v4();
  logger.info("Creating task", createTaskRequest);
  if (createTaskRequest.type === "DAILY") {
    return await tasksAccess.createDailyTask({
      userId: userId,
      taskId: taskId,
      createdAt: new Date().toISOString(),
      description: createTaskRequest.description,
      done: false,
      goalId: createTaskRequest.goalId,
      type: createTaskRequest.type,
    });
  } else if (createTaskRequest.type === "LONG_TERM") {
    return await tasksAccess.createLongtermTask({
      userId: userId,
      taskId: taskId,
      createdAt: new Date().toISOString(),
      description: createTaskRequest.description,
      dueDate: createTaskRequest.dueDate,
      done: false,
      goalId: createTaskRequest.goalId,
      type: createTaskRequest.type,
    });
  } else if (createTaskRequest.type === "GOAL") {
    return await tasksAccess.createGoalTask({
      userId: userId,
      taskId: taskId,
      createdAt: new Date().toISOString(),
      description: createTaskRequest.description,
      done: false,
      type: createTaskRequest.type,
    });
  } else {
    throw new Error("Invalid task type");
  }
}

export async function deleteTask(
  userId: string,
  taskId: string
): Promise<void> {
  await tasksAccess.deleteTask(userId, taskId);
}

export async function updateTask(
  taskId: string,
  userId: string,
  updateTaskRequest: UpdateTaskRequest
): Promise<void> {
  logger.info("Updating task", updateTaskRequest);
  await tasksAccess.updateTask(taskId, userId, {
    description: updateTaskRequest.description,
    dueDate: updateTaskRequest.dueDate,
    completionDate: updateTaskRequest.completionDate,
    done: updateTaskRequest.done,
    goalId: updateTaskRequest.goalId,
  });
}
