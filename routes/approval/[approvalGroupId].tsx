import { Handlers, PageProps } from "$fresh/server.ts";
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
import ApprovalButton from "../../components/ApprovalButton.tsx";
import DeploymentItem from "../../components/DeploymentItem.tsx";
import Auth from "../../islands/Auth.tsx";
import { api, ApprovalResponse } from "../../shared/api.ts";
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
  approval: ApprovalResponse;
};

export default function Approval(
  props: PageProps<ApprovalProps, AuthenticatedState>,
) {
  const { state: { user, returnUrl }, data: { approvalGroupId, approval } } =
    props;
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
                Your approval has been{" "}
                {approval.approval ? "recorded" : "requested"} for the following
                <Divider horizontal>deployment</Divider>
                <DeploymentItem
                  deployment={approval.deployment}
                  check={approval.check}
                />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Item>
                <Item.Header>Your Approval</Item.Header>
                <Item.Content>
                  <ApprovalButton
                    approvalGroup={approval.approvalGroup}
                    approval={approval.approval}
                  />
                </Item.Content>
              </Item>
            </Card.Content>
          </Card>
          <Auth user={user} returnUrl={returnUrl} />
        </Grid.Column>
      </Grid>
    </>
  );
}
