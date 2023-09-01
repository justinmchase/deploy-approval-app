import { Deployment } from "../shared/api.ts";
import ApprovalBadge from "./ApprovalBadge.tsx";
import Creator from "./Creator.tsx";
import Link from "./Link.tsx";

type Props = {
  deployment: Deployment;
};

export default function Deployment(props: Props) {
  const { deployment } = props;
  return (
    <dl class="divide-y divide-gray-100 text-sm">
      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">Date</dt>
        <dd class="text-gray-700 sm:col-span-2">
          {new Date(deployment.createdAt).toLocaleDateString()}
        </dd>
      </div>

      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">Repo</dt>
        <dd class="text-gray-700 sm:col-span-2">
          <Link text={deployment.repository} />
        </dd>
      </div>

      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">Env</dt>
        <dd class="text-gray-700 sm:col-span-2">
          {deployment.environment}
        </dd>
      </div>
      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">Creator</dt>
        <dd class="text-gray-700 sm:col-span-2">
          <Creator creator={deployment.creator} />
        </dd>
      </div>

      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
        <dt class="font-medium text-gray-900">State</dt>
        <dd class="text-gray-700 sm:col-span-2">
          <ApprovalBadge state={deployment.state} />
        </dd>
      </div>
    </dl>
  );
}
