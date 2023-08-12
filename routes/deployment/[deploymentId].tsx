import { Handlers, PageProps } from "$fresh/server.ts";
import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Message,
  SemanticCOLORS,
  Table,
  TableCell,
} from "$semantic-ui";
import ApprovalButton from "../../components/ApprovalButton.tsx";
import ApprovalLabel from "../../components/ApprovalLabel.tsx";
import DeploymentItem from "../../components/DeploymentItem.tsx";
import Auth from "../../islands/Auth.tsx";
import { api, ApprovalResponse, DeploymentResponse } from "../../shared/api.ts";
import { titleCase } from "../../shared/casing.ts";
import { AuthenticatedState } from "../../shared/state.ts";

export const handler: Handlers<unknown, AuthenticatedState> = {
  async GET(_req, ctx) {
    const { accessToken } = ctx.state;
    const { deploymentId } = ctx.params;
    const deployment = await api.deployment(accessToken, deploymentId);
    return ctx.render({
      deployment,
    });
  },
};

type ApprovalProps = {
  deployment: DeploymentResponse;
};

export default function Approval(
  props: PageProps<ApprovalProps, AuthenticatedState>,
) {
  const { state: { user, returnUrl }, data: { deployment } } = props;
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
                Deployment
              </Card.Header>
              <Card.Meta>
                <Icon name="clock" />{" "}
                {new Date(deployment.deployment.createdAt).toLocaleString()}
              </Card.Meta>
              <Card.Description>
                <DeploymentItem
                  deployment={deployment.deployment}
                  check={deployment.check}
                />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Table basic="very" celled collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Approval Group</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {deployment.check.results.map((check) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Header
                            as="a"
                            href={`/approval/${check.approvalGroupId}`}
                          >
                            {titleCase(check.groupName)}
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          <ApprovalLabel
                            approvalState={check.state}
                            approvalAt={check.approvalAt}
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Card.Content>
            <Card.Content extra>
              <Table basic="very" celled collapsing compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Approver</Table.HeaderCell>
                    <Table.HeaderCell>Group</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {deployment.approvals.map((approval) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Header as="h5">
                            {titleCase(approval.approver.name)}
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          {approval.approvalGroupName ?? "unknown group"}
                        </Table.Cell>
                        <Table.Cell>
                          <ApprovalLabel
                            approvalState={approval.state}
                            approvalAt={approval.createdAt ??
                              approval.updatedAt}
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Card.Content>
          </Card>
          <Auth user={user} returnUrl={returnUrl} />
        </Grid.Column>
      </Grid>
    </>
  );
}
