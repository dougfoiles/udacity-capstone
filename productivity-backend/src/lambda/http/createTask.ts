import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors } from "middy/middlewares";
import { CreateTaskRequest } from "../../requests/CreateTaskRequest";
import { getUserId } from "../utils";
import { createTask } from "../businessLogic/tasks";
import { createLogger } from "../../utils/logger";

const logger = createLogger("auth");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTask: CreateTaskRequest = JSON.parse(event.body);
    const userId = getUserId(event);
    logger.info(`Creating todo for user: ${userId}`);
    const task = await createTask(newTask, userId);

    return {
      statusCode: 200,
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
