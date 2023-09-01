import { Handlers, PageProps } from "$fresh/server.ts";
import ApprovalBadge from "../../components/ApprovalBadge.tsx";
import Creator from "../../components/Creator.tsx";
import Deployment from "../../components/Deployment.tsx";
import Link from "../../components/Link.tsx";
import Page from "../../components/Page.tsx";
import { api, DeploymentResponse } from "../../shared/api.ts";
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

type Props = {
  deployment: DeploymentResponse;
};

export default function Approval(
  props: PageProps<Props, AuthenticatedState>,
) {
  const { state: { user, returnUrl }, data: { deployment } } = props;
  return (
    <Page user={user} returnUrl={returnUrl}>
      <div class="flow-root mx-auto max-w-lg">
        <div class="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-300  before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
          Deployment
        </div>
        <Deployment deployment={deployment.deployment} />

        <div class="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-300  before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
          Approval Groups
        </div>

        <div class="mx-auto max-w-lg">
          <ul class="divide-y divide-gray-200 rounded-xl border border-gray-200 shadow-sm">
            {deployment.check.results.map((result) => {
              return (
                <li class="p-4">
                  <h4 class="text-lg font-medium leading-loose">
                    {result.groupName}{" "}
                    <ApprovalBadge
                      state={result.state || undefined}
                      count={result.count}
                    />
                  </h4>

                  <p class="text-gray-500">
                    {new Date(result.approvalAt).toLocaleDateString()}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div class="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-300  before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
          Approvals
        </div>

        <div class="mx-auto max-w-lg">
          <ul class="divide-y divide-gray-200 rounded-xl border border-gray-200 shadow-sm">
            {deployment.approvals.map((approval) => {
              return (
                <li class="p-4">
                  <h4 class="text-lg font-medium leading-loose">
                    <Link
                      text={titleCase(approval.approver.name)}
                      href={`mailto:${approval.approver.email}`}
                    />{" "}
                    <ApprovalBadge state={approval.state} />
                  </h4>
                  <p class="text-gray-700">
                    {approval.approvalGroupName}
                  </p>
                  <p class="text-gray-500">
                    {new Date(approval.createdAt).toLocaleDateString()}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Page>
  );
}
