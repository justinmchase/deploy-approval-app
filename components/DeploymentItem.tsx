import { Button, Image, Item, Label, SemanticCOLORS } from "$semantic-ui";
import { ApprovalState } from "../shared/api.ts";
import { Deployment, DeploymentCheck } from "../shared/api.ts";

type Props = {
  deployment: Deployment;
  check: DeploymentCheck;
};

export default function DeploymentItem(
  props: Props,
) {
  const { deployment, check } = props;

  const statusColor = (
    approvalState?: ApprovalState,
  ): [SemanticCOLORS, string] => {
    switch (approvalState) {
      case "approved":
        return ["green", "Approved"];
      case "rejected":
        return ["red", "Rejected"];
      default:
        return ["blue", "Pending"];
    }
  };

  return (
    <>
      <Item.Group divided>
        <Item>
          <Item.Content>
            <Item.Header>repository</Item.Header>
            <Item.Description>
              <a href={deployment.repository}>
                {deployment.repository}
              </a>
            </Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Content>
            <Item.Header>environment</Item.Header>
            <Item.Description>
              <a
                href={`https://github.com/${deployment.repository}/deployments/${deployment.environment}`}
              >
                {deployment.environment}
              </a>
            </Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Content>
            <Item.Header>time</Item.Header>
            <Item.Description>
              {new Date(deployment.createdAt)
                .toLocaleString()}
            </Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Content>
            <Item.Header>creator</Item.Header>
            <Item.Description>
              <Button
                as="a"
                href={`https://github.com/${deployment.creator.login}`}
                color="black"
              >
                <Image
                  avatar
                  src={deployment.creator.avatarUrl}
                />{" "}
                {deployment.creator.login}
              </Button>
            </Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Content>
            <Item.Header>status</Item.Header>
            <Item.Description>
              <Label
                color={statusColor(deployment.state)[0]}
              >
                {statusColor(deployment.state)[1]}
              </Label>
            </Item.Description>
          </Item.Content>
        </Item>

        <Item>
          <Item.Content>
            <Item.Header>approval groups</Item.Header>
            <Item.Description>
              {check.results.map((result) => {
                const [color, state] = (() => {
                  switch (result.state) {
                    case "approved":
                      return ["green", "Approved"];
                    case "rejected":
                      return ["red", "Rejected"];
                    default:
                      return ["blue", "Pending"];
                  }
                })() as [SemanticCOLORS, string];
                return (
                  <Label color={color} image>
                    {result.groupName}
                    <Label.Detail>{state}</Label.Detail>
                  </Label>
                );
              })}
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
}
