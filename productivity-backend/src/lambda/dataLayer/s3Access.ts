// import * as AWSXRay from 'aws-xray-sdk'
import * as AWS from "aws-sdk";

import { createLogger } from "../../utils/logger";

const logger = createLogger("auth");

export class S3Access {
  constructor(
    private readonly s3: AWS.S3 = new AWS.S3({
      signatureVersion: "v4",
    }),
    private readonly bucketName = process.env.HOMEPAGE_IMAGES_S3_BUCKET,
    private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
  ) {}

  getUploadUrlForHomepageImage(imageId: string) {
    logger.info(`Generating signed homepage image`, {
      imageId,
      bucketName: this.bucketName,
    });
    return this.s3.getSignedUrl("putObject", {
      Bucket: this.bucketName,
      Key: imageId,
      Expires: Number(this.urlExpiration),
    });
  }
}
