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
  state: ApprovalState;
  results: {
    _id: (string | null)[];
    deploymentId: string;
    approvalGroupId: string;
    approvalAt: string;
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
  approvalGroupName: string;
  approver: User;
  state: ApprovalState;
  reason?: string;
  createdAt: string;
  updatedAt?: string;
};

export type ApprovalResponse = {
  approval: Approval;
  deployment: Deployment;
  approvalGroup: ApprovalGroup;
  check: DeploymentCheck;
};

export type DeploymentResponse = {
  deployment: Deployment;
  approvalGroups: ApprovalGroup[];
  approvals: Approval[];
  check: DeploymentCheck;
};

export type ApprovalsResponse = Page<
  Approval & { approvalGroup: ApprovalGroup } & {
    deployment: Deployment;
  }
>;

export type PageArgs = {
  offset: number;
};

export type Page<T> = {
  offset: number;
  limit: number;
  total: number;
  results: T[];
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
  public async deployment(
    accessToken: string,
    deploymentId: string,
  ) {
    const res = await fetch(
      `${config.deployApprovalApi}/deployment/${deploymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return await res.json() as DeploymentResponse;
  }

  public async approvals(
    accessToken: string,
    page: PageArgs,
  ) {
    const res = await fetch(
      `${config.deployApprovalApi}/approvals?offset=${page.offset}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return await res.json() as ApprovalsResponse;
  }
}

export const api = new Api();
