import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { User } from "../shared/state.ts";

export type Data = {
  user?: User;
};

export const handler: Handlers = {
  GET(_req, ctx) {
    const { user } = ctx.state;
    return ctx.render({ user });
  },
};

export default function Home(
  { data: { user } }: PageProps<Data>,
) {
  const count = useSignal(3);
  return (
    <>
      <Head>
        <title>deploy-approval</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">Deploy Approval</h1>
        </div>
        {user
          ? (
            <>
              <a href="./auth/logout">Log Out</a>
            </>
          )
          : (
            <>
              <a href="./auth/login">Log In</a>
            </>
          )}
      </div>
      {user
        ? (
          <>
            Welcome <a href={`mailto:${user.email}`}>{user.name}</a>
          </>
        )
        : <>Please login to continue.</>}
    </>
  );
}
