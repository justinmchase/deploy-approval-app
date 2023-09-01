import { ComponentChildren } from "preact";
import { User } from "../shared/state.ts";
import Top from "./Top.tsx";

type Props = {
  children: ComponentChildren;
  user?: User;
  returnUrl?: string;
};

export default function Page(props: Props) {
  const { children, user, returnUrl } = props;
  return (
    <div class="flex h-screen flex-col">
      <Top user={user} returnUrl={returnUrl}></Top>
      <main class="flex flex-1 justify-center items-top">
        <div class="w-2/3">
          {children}
        </div>
      </main>
    </div>
  );
}
