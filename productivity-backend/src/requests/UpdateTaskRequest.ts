/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateTaskRequest {
  description?: string;
  dueDate?: string;
  done?: boolean;
  completionDate?: string;
  goalId?: string;
}
