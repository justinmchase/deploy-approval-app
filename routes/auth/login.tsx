import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { oauth } from "../../shared/oauth.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const returnUrl = new URL(req.url).searchParams.get("returnUrl") ?? "/";

    const state = btoa(JSON.stringify({ returnUrl }));
    const redirectUri = await oauth.code.getAuthorizationUri({ state });
    const { codeVerifier, uri } = redirectUri;
    const location = uri.toString();

    const headers = new Headers({ Location: location });
    setCookie(headers, {
      name: "state",
      value: state,
    });
    setCookie(headers, {
      name: "codeVerifier",
      value: codeVerifier,
    });
    return new Response("", {
      status: 307,
      headers,
    });
  },
};
