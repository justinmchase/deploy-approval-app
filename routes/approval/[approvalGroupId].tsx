import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Image,
  Label,
  List,
  Message,
  Segment,
  SemanticCOLORS,
} from "$semantic-ui";
import { api, ApprovalGroupResponse } from "../../shared/api.ts";
import { AuthenticatedState } from "../../shared/state.ts";

export const handler: Handlers<unknown, AuthenticatedState> = {
  async GET(_req, ctx) {
    const { accessToken } = ctx.state;
    const { approvalGroupId } = ctx.params;
    const approval = await api.approvalGroup(accessToken, approvalGroupId);
    return ctx.render({
      approvalGroupId,
      approval,
    });
  },
};

type ApprovalProps = {
  approvalGroupId: string;
  approval: ApprovalGroupResponse;
};

export default function Approval(
  props: PageProps<ApprovalProps, AuthenticatedState>,
) {
  const { data: { approvalGroupId, approval } } = props;

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Card centered fluid>
            <Card.Content>
              <Card.Header>
                {approval.approvalGroup.name} Approval Requested
              </Card.Header>
              <Card.Meta>{approval.approvalGroup.id}</Card.Meta>
              <Card.Description>
                Your approval has been requested for the following
                <Divider horizontal>deployment</Divider>
                <List divided relaxed>
                  <List.Item>
                    <List.Content>
                      <List.Header>repository</List.Header>
                      <List.Description>
                        {approval.deployment.repository}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>
                        environment
                      </List.Header>
                      <List.Description as="a">
                        {approval.deployment.environment}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item
                    as="a"
                    href={`https://github.com/${approval.deployment.creator.login}`}
                  >
                    <Image
                      src={approval.deployment.creator.avatarUrl}
                      avatar
                    />
                    <List.Content>
                      <List.Header>
                        creator
                      </List.Header>
                      <List.Description>
                        {approval.deployment.creator.login}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>
                        time
                      </List.Header>
                      <List.Description>
                        {new Date(approval.deployment.createdAt)
                          .toLocaleString()}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>
                        status
                      </List.Header>
                      <List.Description>
                        {approval.check.state ?? "pending"}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description>
                        {approval.check.results.map((result) => {
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
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  as="a"
                  href={`/approval/${approvalGroupId}/approved`}
                >
                  Approve
                </Button>
                <Button
                  basic
                  color="red"
                  as="a"
                  href={`/approval/${approvalGroupId}/rejected`}
                >
                  Reject
                </Button>
              </div>
            </Card.Content>
          </Card>
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
}
