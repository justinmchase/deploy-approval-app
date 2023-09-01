import { Handlers, PageProps } from "$fresh/server.ts";
import ApprovalBadge from "../../components/ApprovalBadge.tsx";
import Link from "../../components/Link.tsx";
import Page from "../../components/Page.tsx";
import Pagination from "../../components/Pagination.tsx";
import {
  api,
  Approval,
  ApprovalGroup,
  ApprovalsResponse,
  Deployment,
} from "../../shared/api.ts";
import { AuthenticatedState } from "../../shared/state.ts";

export const handler: Handlers<unknown, AuthenticatedState> = {
  async GET(_req, ctx) {
    const { accessToken } = ctx.state;
    const data = await api.approvals(accessToken, { offset: 0 });
    return ctx.render(data);
  },
};

export default function Approvals(
  props: PageProps<ApprovalsResponse, AuthenticatedState>,
) {
  const {
    data: page,
    state: { user, returnUrl },
  } = props;

  return (
    <Page user={user} returnUrl={returnUrl}>
      <div class="mx-auto max-w-xlg">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Date
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Repo
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Env
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Yours
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Deployment
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {page.results.map((approval) => {
              return (
                <tr class="odd:bg-white even:bg-gray-50">
                  <td class="px-6 py-4">
                    {new Date(approval.updatedAt ?? approval.createdAt)
                      .toLocaleDateString()}
                  </td>
                  <td class="px-6 py-4">
                    <Link
                      href={`https://github.com/${approval.deployment.repository}`}
                      text={approval.deployment.repository}
                    />
                  </td>
                  <td class="px-6 py-4">{approval.deployment.environment}</td>
                  <th class="px-6 py-4 font-medium text-gray-900">
                    {approval.approvalGroup.name}
                  </th>
                  <td class="px-6 py-4">
                    <a href={`/approval/${approval.approvalGroupId}`}>
                      <ApprovalBadge state={approval.state} />
                    </a>
                  </td>
                  <td class="flex justify-end gap-4 px-6 py-4 font-medium">
                    <a href={`/deployment/${approval.deploymentId}`}>
                      <ApprovalBadge state={approval.deployment.state} />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination page={page}></Pagination>
      </div>
    </Page>
  );
}
