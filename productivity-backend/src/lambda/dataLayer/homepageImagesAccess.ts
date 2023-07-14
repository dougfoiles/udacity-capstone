import * as AWSXRay from "aws-xray-sdk";
import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { HomepageImageItem } from "../../models/HomePageImageItem";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Data Layer Homepage Images");

export class HomepageImagesAccess {
  constructor(
    private readonly docClient: DynamoDBClient = createDynamoDBClient(),
    private readonly homepageImageTable = process.env.HOMEPAGE_IMAGES_TABLE
  ) {}

  async getHomepageImageIdForUser(userId: string): Promise<any[]> {
    logger.info("Getting homepage image ID for user", userId);

    const command = new QueryCommand({
      TableName: this.homepageImageTable,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    });

    const result = await this.docClient.send(command);

    const items = result.Items;
    return items;
  }

  async setHomepageImageForUser(
    homepageImage: HomepageImageItem
  ): Promise<any> {
    const item = {
      userId: { S: homepageImage.userId },
      imageId: { S: homepageImage.imageId },
      createdAt: { S: homepageImage.createdAt },
    };

    logger.info("Setting homepage image ID", item);

    const command = new PutItemCommand({
      TableName: this.homepageImageTable,
      Item: item,
    });

    await this.docClient.send(command);

    return item;
  }

  async getHomepageImageForUser(userId: string): Promise<any> {
    logger.info("Getting homepage image for user", userId);

    const command = new QueryCommand({
      TableName: this.homepageImageTable,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    });

    const result = await this.docClient.send(command);

    const items = result.Items;
    return items;
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info("Creating a local DynamoDB instance");
    // return new XAWS.DynamoDB.DocumentClient({
    //   region: 'localhost',
    //   endpoint: 'http://localhost:8000'
    // })
  }
  return AWSXRay.captureAWSv3Client(new DynamoDBClient({}));
}
