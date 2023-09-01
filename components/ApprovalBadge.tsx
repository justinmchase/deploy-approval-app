import { ApprovalState } from "../shared/api.ts";

type Props = {
  state?: ApprovalState;
  count?: number;
};

export default function ApprovalBadge(props: Props) {
  const { state, count } = props;
  return (
    <>
      {state === "approved"
        ? (
          <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            approved{count != null ? ` ${count}` : ""}
          </span>
        )
        : state === "rejected"
        ? (
          <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            rejected {count != null ? ` ${count}` : ""}
          </span>
        )
        : (
          <span class="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
            pending
          </span>
        )}
      {count !== undefined && state !== undefined
        ? (
          <span class="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            {count}
          </span>
        )
        : <></>}
    </>
  );
}
