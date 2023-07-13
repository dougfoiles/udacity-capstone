import * as uuid from "uuid";

import { S3Access } from "../dataLayer/s3Access";
import { createLogger } from "../../utils/logger";
import { HomepageImagesAccess } from "../dataLayer/homepageImagesAccess";

const logger = createLogger("Business Logic Images");
const s3Access = new S3Access();
const homepageImagesAccess = new HomepageImagesAccess();
const bucketName = process.env.HOMEPAGE_IMAGES_S3_BUCKET;

export async function createHomepageImage(userId: string): Promise<string> {
  const imageId = uuid.v4();

  const item = {
    userId,
    imageId,
    createdAt: new Date().toISOString(),
  };

  await homepageImagesAccess.setHomepageImageForUser(item);

  const signedUrl: string = s3Access.getUploadUrlForHomepageImage(imageId);

  logger.info("Created signedUrl", { signedUrl, userId });

  return signedUrl;
}

export async function updateHomepageImage(userId: string): Promise<string> {
  const imageItems = await homepageImagesAccess.getHomepageImageForUser(userId);

  const signedUrl: string = s3Access.getUploadUrlForHomepageImage(
    imageItems[0].imageId.S
  );

  logger.info("Created signedUrl", { signedUrl, userId });

  return signedUrl;
}

export async function getHomepageImageForUser(userId: string): Promise<string> {
  const imageItems = await homepageImagesAccess.getHomepageImageForUser(userId);
  logger.info(imageItems);
  return `https://${bucketName}.s3.amazonaws.com/${imageItems[0].imageId.S}`;
}
