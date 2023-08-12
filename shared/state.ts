export interface State {
  accessToken?: string;
  user?: User;
}
export interface AuthenticatedState {
  accessToken: string;
  user: User;
}

export interface User {
  oid: string;
  name: string;
  email: string;
}
