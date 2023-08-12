export interface State {
  accessToken?: string;
  returnUrl?: string;
  user?: User;
}
export interface AuthenticatedState {
  accessToken: string;
  returnUrl: string;
  user: User;
}

export interface User {
  oid: string;
  name: string;
  email: string;
}
