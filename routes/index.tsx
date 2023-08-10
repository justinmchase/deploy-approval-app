import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getCookies } from "$std/http/cookie.ts";

import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export type Data = {
  authenticated: boolean;
};

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    return ctx.render({ authenticated: cookies.auth === "123456789" });
  },
};

export default function Home({ data: { authenticated } }: PageProps<Data>) {
  const count = useSignal(3);
  return (
    <>
      <Head>
        <title>deploy-approval</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">Deploy Approval</h1>
          {/* <Counter count={count} /> */}
          Authenticated: {`${authenticated}`}
        </div>
      </div>
    </>
  );
}
