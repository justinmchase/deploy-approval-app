import { Handlers, PageProps } from "$fresh/server.ts";
import ApprovalBadge from "../../components/ApprovalBadge.tsx";
import Deployment from "../../components/Deployment.tsx";
import Link from "../../components/Link.tsx";
import Page from "../../components/Page.tsx";

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
    <Page user={user} returnUrl={returnUrl}>
      <div class="flow-root mx-auto max-w-lg">
        <div class="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-300  before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
          <Link
            text="Deployment"
            href={`/deployment/${approval.deployment._id}`}
          />
        </div>
        <Deployment deployment={approval.deployment} />

        <div class="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-300  before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
          Your Approval
        </div>

        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Group</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {approval.approvalGroup.name}
            </dd>
          </div>
        </dl>
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">State</dt>
            <dd class="text-gray-700 sm:col-span-2">
              <ApprovalBadge state={approval.approval?.state} />
            </dd>
          </div>
        </dl>

        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900"></dt>
            <dd class="text-gray-700 sm:col-span-2">
              <div class="inline-flex -space-x-0 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                <a
                  href={approval.deployment.state
                    ? "#"
                    : `/approval/${approvalGroupId}/approved`}
                  class={approval.deployment.state
                    ? "px-4 py-2.5 text-center text-white text-sm font-medium text-secondary-700 cursor-not-allowed border-gray-300 bg-gray-300"
                    : "px-4 py-2.5 text-center text-white text-sm font-medium text-secondary-700 bg-green-400 hover:bg-green-500"}
                  disabled={!!approval.deployment.state}
                >
                  Approve
                </a>
                <a
                  href={approval.deployment.state
                    ? "#"
                    : `/approval/${approvalGroupId}/rejected`}
                  class={approval.deployment.state
                    ? "px-4 py-2.5 text-center text-white text-sm font-medium text-secondary-700 cursor-not-allowed border-gray-300 bg-gray-300"
                    : "px-4 py-2.5 text-center text-white text-sm font-medium text-secondary-700 bg-red-500 hover:bg-red-600"}
                >
                  Reject
                </a>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </Page>
  );
}
