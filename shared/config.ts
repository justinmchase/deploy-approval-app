import { load } from "$std/dotenv/mod.ts";
const env = {
  ...Deno.env.toObject(),
  ...await load(),
};
const azureClientId = env["AZURE_CLIENT_ID"];
const azureClientSecret = env["AZURE_CLIENT_SECRET"];
const azureRedirectUri = env["AZURE_REDIRECT_URI"];
const deployApprovalApi = env["DEPLOY_APPROVAL_API"];
export const config = {
  azureClientId,
  azureClientSecret,
  azureRedirectUri,
  deployApprovalApi,
};
