import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const returnUrl = url.searchParams.get("returnUrl") ?? "/";
    const headers = new Headers({
      Location: returnUrl,
    });
    deleteCookie(headers, "state");
    deleteCookie(headers, "codeVerifier");
    deleteCookie(headers, "accessToken", { path: "/" });
    deleteCookie(headers, "refreshToken", { path: "/" });
    return new Response("", {
      status: 302,
      headers,
    });
  },
};
