import { Head } from "$fresh/runtime.ts";
import { Handler, Handlers, PageProps } from "$fresh/server.ts";
import Top from "../components/Top.tsx";
import { User } from "../shared/state.ts";

export default function Error404(props: PageProps<unknown, { user?: User }>) {
  const { user } = props.state;
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <Top user={user} />
      <div class="grid h-screen px-4 bg-white place-content-center">
        <h1 class="tracking-widest text-gray-500 uppercase">404 | Not Found</h1>
      </div>
    </>
  );
}
