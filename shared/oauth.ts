import { OAuth2Client } from "$oauth";
import { load } from "$std/dotenv/mod.ts";

const env = {
  ...Deno.env.toObject(),
  ...await load(),
};
const clientId = env["AZURE_CLIENT_ID"];
const clientSecret = env["AZURE_CLIENT_SECRET"];
const redirectUri = env["AZURE_REDIRECT_URI"];
export const oauth = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri,
  authorizationEndpointUri:
    "https://login.microsoftonline.com/22dddbf3-6a10-486d-94dc-b3eca6a4d13e/oauth2/v2.0/authorize",
  tokenUri:
    "https://login.microsoftonline.com/22dddbf3-6a10-486d-94dc-b3eca6a4d13e/oauth2/v2.0/token",
  defaults: {
    scope: "profile openid email User.Read",
  },
});
