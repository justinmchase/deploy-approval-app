import { PageProps } from "$fresh/server.ts";
import { AuthenticatedState } from "../shared/state.ts";
import Page from "../components/Page.tsx";
import Link from "../components/Link.tsx";

// <div class="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
//   <div class="max-w-xl">
//     <h2 class="text-3xl font-bold sm:text-4xl">
//       Open Source
//     </h2>

//     <p class="mt-4 text-gray-300">
//       Deploy approval is a free and open source tool to help facilitate
//       an approval process for non-github users.
//     </p>
//     <p class="mt-4 text-gray-300">
//       It allows you to define different approval groups and send
//       approvals through your own action runners by whatever means
//       desired, including automated processes. Simply get an approval or
//       rejection from each group to proceed.
//     </p>
//   </div>
// <section class="bg-gray-900 text-white">
//     <div class="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
export default function About(props: PageProps<unknown, AuthenticatedState>) {
  return (
    <Page user={props.state.user} returnUrl={props.state.returnUrl}>
      <section class="">
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div class="mx-auto max-w-lg text-center">
            <h2 class="text-3xl font-bold sm:text-4xl">
              Free and Open Source
            </h2>
            <p class="mt-4 text-gray-700">
              Deploy approval is a free and open source tool to help facilitate
              an approval process for non-github users and automated processes.
            </p>
            <p class="mt-4 text-gray-700">
              It allows you to define different approval groups and send
              approvals through your own action runners by whatever means
              desired, including automated processes. Simply get an approval or
              rejection from each group to proceed.
            </p>
            <p class="mt-4 text-gray-700">
              For details on how to setup, use and configure Deploy Approval,
              please see the{" "}
              <Link
                href="https://github.com/justinmchase/deploy-approval-api/blob/main/docs/install.md#deploy-approval-installation"
                text="documentation"
              />.
            </p>
          </div>

          <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="https://github.com/justinmchase/deploy-approval-api"
            >
              <img
                class="h-10 w-10 text-pink-500"
                src="/github-mark.svg"
              />

              <h2 class="mt-4 text-xl font-bold text-gray-700">
                Backend
              </h2>
              <p class="mt-1 text-sm text-gray-600">
                A Deno Deploy and Grove based api server for handling github
                webhooks and driving the Deploy Approval UI.
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="https://github.com/justinmchase/deploy-approval-app"
            >
              <img
                class="h-10 w-10 text-pink-500"
                src="/github-mark.svg"
              />

              <h2 class="mt-4 text-xl font-bold text-gray-700">
                Frontend
              </h2>

              <p class="mt-1 text-sm text-gray-600">
                A Deno Deploy and Fresh based UI built with twind and serves as
                the Approval UI and User Authentication with Azure.
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="https://github.com/justinmchase/grove"
            >
              <img
                class="h-10 w-10 text-pink-500"
                src="/github-mark.svg"
              />

              <h2 class="mt-4 text-xl font-bold text-gray-700">
                Grove
              </h2>

              <p class="mt-1 text-sm text-gray-600">
                A Deno based hybrid microserivce library for developing backend
                services and github applications.
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="https://deno.deploy"
            >
              <img
                class="h-10 w-10 text-pink-500"
                src="/Deno.svg"
              />

              <h2 class="mt-4 text-xl font-bold text-gray-700">
                Deno Deploy
              </h2>

              <p class="mt-1 text-sm text-gray-600">
                The serverless hosting service for both the api and the ui
                components.
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="https://fresh.deno.dev"
            >
              <img
                class="h-10 w-10 text-pink-500"
                src="/fresh.svg"
              />

              <h2 class="mt-4 text-xl font-bold text-gray-700">
                Fresh
              </h2>

              <p class="mt-1 text-sm text-gray-600">
                The UI is built with Deno Fresh. The next-gen web framework.
              </p>
            </a>

            <a
              class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="https://github.com/apps/deploy-approval"
            >
              <img
                class="h-10 w-10 text-pink-500"
                src="/logo.png"
              />

              <h2 class="mt-4 text-xl font-bold text-gray-700">
                Install
              </h2>

              <p class="mt-1 text-sm text-gray-600">
                Head to GitHub to install Deploy Approval!
              </p>
            </a>
          </div>
        </div>
      </section>
    </Page>
  );
}
