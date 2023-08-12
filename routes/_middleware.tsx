// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { State } from "../shared/state.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const cookies = getCookies(req.headers);
  const { accessToken } = cookies;
  if (accessToken) {
    const [, payload] = accessToken.split(".");
    const token = JSON.parse(atob(payload));
    const { oid, name, email } = token;
    ctx.state.accessToken = accessToken;
    ctx.state.user = {
      oid,
      name,
      email,
    };
  }
  return await ctx.next();
}
