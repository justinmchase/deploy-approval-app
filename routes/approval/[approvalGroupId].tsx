import { PageProps } from "$fresh/server.ts";

export default function Approval(props: PageProps) {
  return <div>Approval for {props.params.approvalGroupId}</div>;
}
