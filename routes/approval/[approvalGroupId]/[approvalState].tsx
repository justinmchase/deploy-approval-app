import { Handlers } from "$fresh/server.ts";
import { AuthenticatedState } from "../../../shared/state.ts";
import { api, ApprovalState } from "../../../shared/api.ts";

export const handler: Handlers<unknown, AuthenticatedState> = {
  async GET(_req, ctx) {
    const { accessToken } = ctx.state;
    const { approvalGroupId, approvalState } = ctx.params;
    await api.approval(
      accessToken,
      approvalGroupId,
      approvalState as ApprovalState,
    );
    return new Response("", {
      status: 302,
      headers: {
        Location: `/approval/${approvalGroupId}`,
      },
    });
  },
};
