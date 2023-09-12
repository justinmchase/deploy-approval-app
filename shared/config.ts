import { load } from "$std/dotenv/mod.ts";
const env = {
  ...Deno.env.toObject(),
  ...await load(),
};
const azureTenantId = env["AZURE_TENANT_ID"];
const azureClientId = env["AZURE_CLIENT_ID"];
const azureClientSecret = env["AZURE_CLIENT_SECRET"];
const azureRedirectUri = env["AZURE_REDIRECT_URI"];
const azureB2CWorkflow = env["AZURE_B2C_WORKFLOW"] ??
  "B2C_1_deploy_approval_signup_and_signin";
const deployApprovalApi = env["DEPLOY_APPROVAL_API"];
export const config = {
  azureTenantId,
  azureClientId,
  azureClientSecret,
  azureRedirectUri,
  azureB2CWorkflow,
  deployApprovalApi,
};
