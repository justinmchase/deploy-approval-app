import { User } from "../shared/state.ts";

export default function Top(opts: { user?: User; returnUrl?: string }) {
  const { user, returnUrl } = opts;
  return (
    <header class="bg-blue-50">
      <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a class="block text-green-600" href="/">
          <span class="sr-only">Home</span>
          <img
            alt="Deploy Approval"
            src="/logo.png"
            class="h-12 w-12 rounded-full object-cover"
          />
        </a>

        <div class="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="/about"
                >
                  About
                </a>
              </li>

              {user && (
                <li>
                  <a
                    class="text-gray-500 transition hover:text-gray-500/75"
                    href="/approvals"
                  >
                    Approvals
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4 text-gray-500 transition hover:text-gray-500/75">
              {user?.name}
            </div>
            <div class="sm:flex sm:gap-4">
              {user
                ? (
                  <a
                    class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:gray-teal-600/75 sm:block"
                    href={returnUrl
                      ? `/auth/logout?returnUrl=${returnUrl}`
                      : `/auth/logout`}
                  >
                    Logout
                  </a>
                )
                : (
                  <a
                    class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:gray-teal-600/75 sm:block"
                    href={`/auth/login?returnUrl=${returnUrl}`}
                  >
                    Login
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
