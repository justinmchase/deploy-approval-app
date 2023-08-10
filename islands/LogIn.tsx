// islands/SignInForm.tsx

// import { FormButton, Input } from "../components/index.ts";
import { Button } from "../components/mod.tsx";

export default function LogIn() {
  return (
    <div class="items-stretch min-w-0">
      <div class="flex justify-center">
        <h2 class="my-4">Log In</h2>
      </div>

      {
        /* <form method="post" class="flex flex-col space-y-4 min-w-0">
        <Input autofocus type="email" name="email" />
        <Input type="password" name="password" />

        <FormButton type="submit" formAction="/api/sign-in" class="!mt-8">
          Sign In
        </FormButton>
      </form> */
      }
      <Button>Log In</Button>
    </div>
  );
}
