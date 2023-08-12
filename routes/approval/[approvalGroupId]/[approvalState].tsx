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
import { AuthenticatedState } from "../../../shared/state.ts";
import {
  api,
  ApprovalGroupResponse,
  ApprovalState,
} from "../../../shared/api.ts";

export const handler: Handlers<unknown, AuthenticatedState> = {
  async GET(_req, ctx) {
    const { accessToken } = ctx.state;
    const { approvalGroupId, approvalState } = ctx.params;
    const approval = await api.approval(
      accessToken,
      approvalGroupId,
      approvalState as ApprovalState,
    );
    return ctx.render({
      approvalGroupId,
      approvalState,
      approval,
    });
  },
};

type ApprovalProps = {
  approvalGroupId: string;
  approvalState: ApprovalState;
  approval: ApprovalGroupResponse;
};

export default function Approval(
  props: PageProps<ApprovalProps, AuthenticatedState>,
) {
  const {
    state: { user },
    data: { approvalGroupId, approvalState, approval },
  } = props;

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
                {approval.approvalGroup.name} Approval Sent
              </Card.Header>
              <Card.Meta>{approval.approvalGroup.id}</Card.Meta>
              <Card.Description>
                Your approval has been sent for the following
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
                        {approval.check.state}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Description>
                        {approval.check.results.map((result) => {
                          const [color, state, count] = (() => {
                            switch (result.state) {
                              case "approved":
                                return ["green", "Approved", result.count];
                              case "rejected":
                                return ["red", "Rejected", result.count];
                              default:
                                return ["blue", "Pending", result.count];
                            }
                          })() as [SemanticCOLORS, string, number];
                          return (
                            <>
                              <Label color={color} image>
                                {result.groupName}
                                <Label.Detail>{state}</Label.Detail>
                              </Label>
                            </>
                          );
                        })}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {approvalState === "approved"
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
                )}
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
