import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";

import { getTasksForUser } from "../businessLogic/tasks";
import { getUserId } from "../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event);
    // Write your code here
    const tasks = await getTasksForUser(userId);

    return {
      statusCode: 201,
      body: JSON.stringify({
        items: tasks,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
