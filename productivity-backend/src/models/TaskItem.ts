export interface TaskItem {
  userId: string;
  taskId: string;
  goalId?: string;
  createdAt: string;
  description: string;
  dueDate?: string;
  done: boolean;
  type: string;
}
