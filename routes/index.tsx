import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import { useSignal } from "@preact/signals";
import { User } from "../shared/state.ts";
import Auth from "../islands/Auth.tsx";

export type Data = {
  user?: User;
  returnUrl: string;
};

export const handler: Handlers = {
  GET(req, ctx) {
    const { user } = ctx.state;
    return ctx.render({ user, returnUrl: req.url });
  },
};

export default function Home(
  { data: { user, returnUrl } }: PageProps<Data>,
) {
  return (
    <>
      <Head>
        <title>Deploy Approval App</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold">Deploy Approval App</h1>
          <p class="my-4">
            Configurable deployment approval processes for the entire team.
          </p>
          <a href="https://github.com/apps/deploy-approval" class="underline">
            Get started now
          </a>
        </div>
      </div>
    </>
  );
}
