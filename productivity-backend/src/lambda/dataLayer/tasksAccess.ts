import * as AWSXRay from "aws-xray-sdk";
import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

import { TaskItem } from "../../models/TaskItem";
import { TaskUpdate } from "../../models/TaskUpdate";
// import { createLogger } from "../../utils/logger";

// const logger = createLogger("Data Layer Tasks Access");

export class TasksAccess {
  constructor(
    private readonly docClient: DynamoDBClient = createDynamoDBClient(),
    private readonly tasksTable = process.env.TASKS_TABLE,
    private readonly tasksIndex = process.env.TASKS_CREATED_AT_INDEX
  ) {}

  async getTasksForUser(userId: string): Promise<any[]> {
    console.log("Getting all tasks");

    const command = new QueryCommand({
      TableName: this.tasksTable,
      IndexName: this.tasksIndex,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    });

    const result = await this.docClient.send(command);

    const items = result.Items;
    return items;
  }

  async getTaskForUser(userId: string, taskId: string): Promise<any[]> {
    console.log(`Getting task with ID: ${taskId}`);

    const command = new QueryCommand({
      TableName: this.tasksTable,
      KeyConditionExpression: "userId = :userId AND taskId = :taskId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
        ":taskId": { S: taskId },
      },
    });

    const result = await this.docClient.send(command);

    const items = result.Items;
    return items;
  }

  async createDailyTask(task: TaskItem): Promise<TaskItem> {
    const item = {
      userId: { S: task.userId },
      taskId: { S: task.taskId },
      goalId: { S: task.goalId },
      createdAt: { S: task.createdAt },
      description: { S: task.description },
      done: { BOOL: task.done },
      type: { S: task.type },
    };

    const command = new PutItemCommand({
      TableName: this.tasksTable,
      Item: item,
    });

    await this.docClient.send(command);

    return task;
  }

  async createGoalTask(task: TaskItem): Promise<TaskItem> {
    const item = {
      userId: { S: task.userId },
      taskId: { S: task.taskId },
      createdAt: { S: task.createdAt },
      description: { S: task.description },
      done: { BOOL: task.done },
      type: { S: task.type },
    };

    const command = new PutItemCommand({
      TableName: this.tasksTable,
      Item: item,
    });

    await this.docClient.send(command);

    return task;
  }

  async createLongtermTask(task: TaskItem): Promise<TaskItem> {
    const item = {
      userId: { S: task.userId },
      taskId: { S: task.taskId },
      createdAt: { S: task.createdAt },
      description: { S: task.description },
      dueDate: { S: task.dueDate },
      done: { BOOL: task.done },
      type: { S: task.type },
      goalId: { S: task.goalId },
    };

    const command = new PutItemCommand({
      TableName: this.tasksTable,
      Item: item,
    });

    await this.docClient.send(command);

    return task;
  }

  async deleteTask(userId: string, taskId: string): Promise<void> {
    const deleteCommand = new DeleteItemCommand({
      TableName: this.tasksTable,
      Key: {
        taskId: { S: taskId },
        userId: { S: userId },
      },
    });

    await this.docClient.send(deleteCommand);
  }

  async updateTask(
    taskId: string,
    userId: string,
    taskUpdate: TaskUpdate
  ): Promise<void> {
    const attributeUpdates = {};
    for (const [key, value] of Object.entries(taskUpdate)) {
      if (value !== undefined) {
        if (typeof value === "boolean") {
          attributeUpdates[key] = { Value: { BOOL: value }, Action: "PUT" };
        } else {
          attributeUpdates[key] = { Value: { S: value }, Action: "PUT" };
        }
      }
    }
    const command = new UpdateItemCommand({
      TableName: this.tasksTable,
      Key: { taskId: { S: taskId }, userId: { S: userId } },
      AttributeUpdates: attributeUpdates,
    });

    await this.docClient.send(command);
  }

  // async updateTaskAttachment(
  //   taskId: string,
  //   userId: string,
  //   attachmentUrl: string
  // ): Promise<void> {
  //   const command = new UpdateItemCommand({
  //     TableName: this.tasksTable,
  //     Key: { taskId: { S: taskId }, userId: { S: userId } },
  //     AttributeUpdates: {
  //       // AttributeUpdates
  //       attachmentUrl: {
  //         // AttributeValueUpdate
  //         Value: { S: attachmentUrl },
  //         Action: "PUT",
  //       },
  //     },
  //   });

  //   await this.docClient.send(command);
  // }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log("Creating a local DynamoDB instance");
    // return new XAWS.DynamoDB.DocumentClient({
    //   region: 'localhost',
    //   endpoint: 'http://localhost:8000'
    // })
  }
  return AWSXRay.captureAWSv3Client(new DynamoDBClient({}));
}
