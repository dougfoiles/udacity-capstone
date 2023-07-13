/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTaskRequest {
  description: string;
  dueDate: string;
  type: string;
  goalId?: string;
}
