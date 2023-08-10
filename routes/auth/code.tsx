import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Tokens } from "$oauth";
import { deleteCookie, getCookies, setCookie } from "$std/http/cookie.ts";
import { oauth } from "../../shared/oauth.ts";

export const handler: Handlers = {
  async GET(req) {
    const { state, codeVerifier } = getCookies(req.headers);
    const { returnUrl } = JSON.parse(atob(state));
    const tokens = await oauth.code.getToken(req.url, {
      state,
      codeVerifier,
      requestOptions: {
        urlParams: {
          grant_type: "authorization_code",
        },
      },
    });
    const headers = new Headers({
      Location: returnUrl,
    });
    deleteCookie(headers, "state");
    deleteCookie(headers, "codeVerifier");
    setCookie(headers, {
      name: "accessToken",
      value: tokens.accessToken,
      sameSite: "Lax",
      secure: false,
      path: "/",
      httpOnly: true,
      ...tokens.expiresIn
        ? { expires: new Date().valueOf() + (tokens.expiresIn * 1000) }
        : {},
    });
    if (tokens.refreshToken) {
      setCookie(headers, {
        name: "refreshToken",
        value: tokens.refreshToken,
        ...tokens.expiresIn
          ? { expires: new Date().valueOf() + (tokens.expiresIn * 1000) }
          : {},
      });
    }

    return new Response("", {
      status: 302,
      headers,
    });
  },
};
export default function Code(
  { data: { tokens } }: PageProps<{ tokens: Tokens }>,
) {
  console.log(tokens);
  return (
    <>
      <Head>
        <title>deploy-approval</title>
      </Head>
      Auth code...
    </>
  );
}
