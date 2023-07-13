import { CustomAuthorizerEvent, CustomAuthorizerResult } from "aws-lambda";
import "source-map-support/register";

import { verify, decode } from "jsonwebtoken";
import { createLogger } from "../../utils/logger";
import Axios from "axios";
import { Jwt } from "../../auth/Jwt";
import { JwtPayload } from "../../auth/JwtPayload";

const logger = createLogger("auth");

const jwksUrl =
  "https://dev-yy75jzfl6v4glka1.us.auth0.com/.well-known/jwks.json";

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info("Authorizing a user", event.authorizationToken);
  try {
    const jwtToken = await verifyToken(event.authorizationToken, jwksUrl);
    logger.info("User was authorized", jwtToken);

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*",
          },
        ],
      },
    };
  } catch (e) {
    logger.error("User not authorized", { error: e.message });

    return {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: "*",
          },
        ],
      },
    };
  }
};

async function verifyToken(
  authHeader: string,
  jwksUrl: string
): Promise<JwtPayload> {
  const token = getToken(authHeader);
  const jwt: Jwt = decode(token, { complete: true }) as Jwt;
  let certValue;

  try {
    const response = await Axios.get(jwksUrl);

    const keys = response.data.keys;

    certValue = keys.find((key) => {
      return key.kid === jwt.header.kid;
    });
  } catch (e) {
    throw new Error("Error getting auth0 certificate");
  }

  const cert = `-----BEGIN CERTIFICATE-----\n${certValue.x5c}\n-----END CERTIFICATE-----`;

  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  return verify(token, cert, { algorithms: ["RS256"] }) as JwtPayload;
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error("No authentication header");

  if (!authHeader.toLowerCase().startsWith("bearer "))
    throw new Error("Invalid authentication header");

  const split = authHeader.split(" ");
  const token = split[1];

  return token;
}
