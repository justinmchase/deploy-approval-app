import { User } from "../shared/state.ts";
import { titleCase } from "../shared/casing.ts";

interface AuthProps {
  user?: User;
  returnUrl: string;
}

export default function Auth(props: AuthProps) {
  const { user, returnUrl } = props;
  return (
    <div class="flex gap-8 py-6">
      {!user && (
        <a href={`/auth/login?returnUrl=${encodeURI(returnUrl)}`}>Log In</a>
      )}
      {user && (
        <>
          {`${titleCase(user.name)}`}
          <a href={`/auth/logout?returnUrl=${encodeURI(returnUrl)}`}>Log Out</a>
        </>
      )}
    </div>
  );
}
