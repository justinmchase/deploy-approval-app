import { Handlers, PageProps } from "$fresh/server.ts";
import { User } from "../shared/state.ts";
import Top from "../components/Top.tsx";

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
      <Top user={user} returnUrl={returnUrl} />
      <section class="bg-gray-50">
        <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div class="mx-auto max-w-xl text-center">
            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <img
                alt="Deploy Approval"
                src="logo.png"
                class="h-64 w-64 center object-cover"
              />
              <div class="mx-auto max-w-xl text-center">
                <h1 class="text-3xl text-green-400 font-extrabold sm:text-5xl">
                  Deploy Approval
                </h1>

                <p class="mt-4 sm:text-xl/relaxed">
                  Easy, configurable approvals for Github Deployments.
                </p>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <a
                class="block w-full rounded bg-green-400 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-500 focus:outline-none focus:ring active:bg-green-600 sm:w-auto"
                href="https://github.com/apps/deploy-approval"
              >
                Install
              </a>

              <a
                class="block w-full rounded px-12 py-3 text-sm font-medium text-red-400 shadow hover:text-red-500 focus:outline-none focus:ring active:text-red-300 sm:w-auto"
                href="/about"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
