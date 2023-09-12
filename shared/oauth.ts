import { OAuth2Client } from "$oauth";
import { config } from "./config.ts";

export const oauth = new OAuth2Client({
  clientId: config.azureClientId,
  clientSecret: config.azureClientSecret,
  redirectUri: config.azureRedirectUri,
  authorizationEndpointUri:
    `https://deployapproval.b2clogin.com/deployapproval.onmicrosoft.com/oauth2/v2.0/authorize`,
  tokenUri:
    `https://deployapproval.b2clogin.com/deployapproval.onmicrosoft.com/oauth2/v2.0/token`,
  defaults: {
    requestOptions: {
      urlParams: {
        p: config.azureB2CWorkflow,
        prompt: "login",
      },
    },
    scope: `openid offline_access ${config.azureClientId}`,
  },
});
