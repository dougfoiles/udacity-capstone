import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { createHomepageImage } from "../businessLogic/images";
import { getUserId } from "../utils";
import { createLogger } from "../../utils/logger";

const logger = createLogger("auth");

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event);

    const signedUrl = await createHomepageImage(userId);

    logger.info(`returning url: ${signedUrl}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: signedUrl,
      }),
    };
  }
);

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true,
  })
);
