import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";

import { getHomepageImageForUser } from "../businessLogic/images";
import { getUserId } from "../utils";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event);
    // Write your code here
    const accessUrl = await getHomepageImageForUser(userId);

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: accessUrl,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
