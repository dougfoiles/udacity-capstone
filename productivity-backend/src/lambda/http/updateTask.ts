import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { updateTask } from "../businessLogic/tasks";
import { UpdateTaskRequest } from "../../requests/UpdateTaskRequest";
import { getUserId } from "../utils";
import { createLogger } from "../../utils/logger";

const logger = createLogger("auth");
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const taskId = event.pathParameters.taskId;
    const userId = getUserId(event);
    const updatedTask: UpdateTaskRequest = JSON.parse(event.body);

    await updateTask(taskId, userId, updatedTask);

    logger.info("Updated task", taskId);
    return {
      statusCode: 202,
      body: JSON.stringify({}),
    };
  }
);

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
