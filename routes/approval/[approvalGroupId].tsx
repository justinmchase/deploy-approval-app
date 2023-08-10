import { PageProps } from "$fresh/server.ts";
import { AuthenticatedState } from "../../shared/state.ts";

export default function Approval(
  props: PageProps<unknown, AuthenticatedState>,
) {
  const { state: { user }, params: { approvalGroupId } } = props;
  return <div>{user.name} approval for {approvalGroupId}</div>;
}
