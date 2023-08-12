import { User } from "../shared/state.ts";
import { titleCase } from "../shared/casing.ts";
import { Button, Label, Message } from "$semantic-ui";

interface AuthProps {
  user?: User;
  returnUrl: string;
}

export default function Auth(props: AuthProps) {
  const { user, returnUrl } = props;
  return (
    <Message>
      {!user && (
        <Button
          as="a"
          href={`/auth/login?returnUrl=${encodeURI(returnUrl)}`}
        >
          Log In
        </Button>
      )}
      {user && (
        <>
          <Button as="div" labelPosition="left">
            <Label basic color="green" pointing="right">
              {`${titleCase(user.name)}`}
            </Label>
            <Button
              as="a"
              href={`/auth/logout?returnUrl=${encodeURI(returnUrl)}`}
            >
              Log Out
            </Button>
          </Button>
        </>
      )}
    </Message>
  );
}
