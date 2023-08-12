import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { State } from "../../shared/state.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const { user } = ctx.state;
  if (!user) {
    const headers = new Headers({
      Location: `/auth/login?returnUrl=${encodeURI(req.url)}`,
    });
    return new Response("", {
      status: 302,
      headers,
    });
  }
  return await ctx.next();
}
