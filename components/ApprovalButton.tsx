import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Image,
  Item,
  Label,
  Message,
  SemanticCOLORS,
} from "$semantic-ui";
import { Approval, ApprovalGroup, ApprovalState } from "../shared/api.ts";

type Props = {
  approvalGroup: ApprovalGroup;
  approval?: Approval;
};

export default function DeploymentItem(
  props: Props,
) {
  const { approvalGroup, approval } = props;
  return approval
    ? (approval.state === "approved"
      ? (
        <Button
          basic
          color="green"
          disabled
        >
          Approved
        </Button>
      )
      : (
        <Button
          basic
          color="red"
          disabled
        >
          Rejected
        </Button>
      ))
    : (
      <>
        <Button.Group size="large">
          <Button
            color="green"
            as="a"
            href={`/approval/${approvalGroup._id}/approved`}
          >
            Approve
          </Button>
          <Button.Or />
          <Button
            color="red"
            as="a"
            href={`/approval/${approvalGroup._id}/rejected`}
          >
            Reject
          </Button>
        </Button.Group>
      </>
    );
}
