import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";

import { getTaskForUser } from "../businessLogic/tasks";
import { getUserId } from "../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const taskId = event.pathParameters.taskId;
    const userId = getUserId(event);
    // Write your code here
    const task = await getTaskForUser(userId, taskId);

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: task,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
