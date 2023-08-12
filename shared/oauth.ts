import { OAuth2Client } from "$oauth";
import { config } from "./config.ts";

export const oauth = new OAuth2Client({
  clientId: config.azureClientId,
  clientSecret: config.azureClientSecret,
  redirectUri: config.azureRedirectUri,
  authorizationEndpointUri:
    "https://login.microsoftonline.com/22dddbf3-6a10-486d-94dc-b3eca6a4d13e/oauth2/v2.0/authorize",
  tokenUri:
    "https://login.microsoftonline.com/22dddbf3-6a10-486d-94dc-b3eca6a4d13e/oauth2/v2.0/token",
  defaults: {
    scope: "api://ce608137-10fc-4b3e-824b-a3b601a2f424/Deploy.Approver openid", // offline_access for refresh token...
  },
});
