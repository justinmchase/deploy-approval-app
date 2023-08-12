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
import DeploymentItem from "../../../components/DeploymentItem.tsx";
import ApprovalButton from "../../../components/ApprovalButton.tsx";

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
