import { Button, Icon, Image, Item, Label, SemanticCOLORS } from "$semantic-ui";
import { ApprovalState } from "../shared/api.ts";
import { Deployment, DeploymentCheck } from "../shared/api.ts";
import ApprovalLabel from "./ApprovalLabel.tsx";

type Props = {
  deployment: Deployment;
  check: DeploymentCheck;
};

export default function DeploymentItem(
  props: Props,
) {
  const { deployment, check } = props;

  return (
    <>
      <Item.Group divided>
        <Item>
          <Item.Content>
            <Item.Header>run</Item.Header>
            <Item.Description>
              <a
                href={`https://github.com/${deployment.repository}/actions/runs/${deployment.runId}`}
              >
                {deployment.runId}
              </a>
            </Item.Description>
          </Item.Content>
        </Item>

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
              <Icon name="clock" />
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
              <ApprovalLabel
                approvalState={deployment.state}
                approvalAt={deployment.updatedAt}
              />
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
}
