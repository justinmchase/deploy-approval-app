import { config } from "./config.ts";

export type ApprovalState = "approved" | "rejected";
export type Deployment = {
  _id: string;
  deploymentId: number;
  repository: string;
  installationId: number;
  environment: string;
  ref: string;
  state?: ApprovalState;
  creator: {
    login: string;
    url: string;
    avatarUrl: string;
  };
  createdAt: string;
  runId: number;
  updatedAt: string;
};

export type ApprovalGroup = {
  _id: string;
  deploymentId: string;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type DeploymentCheck = {
  state: string;
  results: {
    _id: (string | null)[];
    deploymentId: string;
    approvalGroupId: string;
    groupId: string;
    groupName: string;
    state: ApprovalState | null;
    count: number;
  }[];
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Approval = {
  _id: string;
  deploymentId: string;
  approvalGroupId: string;
  approver: User;
  state: ApprovalState;
  reason?: string;
};

export type ApprovalResponse = {
  approval: Approval;
  deployment: Deployment;
  approvalGroup: ApprovalGroup;
  check: DeploymentCheck;
};

export class Api {
  public async approvalGroup(
    accessToken: string,
    approvalGroupId: string,
  ) {
    const res = await fetch(
      `${config.deployApprovalApi}/approval/${approvalGroupId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return await res.json() as ApprovalResponse;
  }
  public async approval(
    accessToken: string,
    approvalGroupId: string,
    approvalState: ApprovalState,
  ) {
    const res = await fetch(
      `${config.deployApprovalApi}/approval/${approvalGroupId}/${approvalState}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return await res.json() as ApprovalResponse;
  }
}

export const api = new Api();
