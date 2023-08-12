import { Icon, Label, SemanticCOLORS } from "$semantic-ui";

type Props = {
  approvalState?: string | null;
  approvalAt?: string;
};

export default function ApprovalLabel(
  props: Props,
) {
  const { approvalState, approvalAt } = props;
  const [color, text] = ((): [SemanticCOLORS, string] => {
    switch (approvalState) {
      case "approved":
        return ["green", "Approved"];
      case "rejected":
        return ["red", "Rejected"];
      default:
        return ["blue", "Pending"];
    }
  })();

  return (
    <Label
      color={color}
      image
    >
      {text}
      {approvalState && approvalAt && (
        <Label.Detail>
          <Icon name="clock" />
          {new Date(approvalAt).toDateString()}
        </Label.Detail>
      )}
    </Label>
  );
}
