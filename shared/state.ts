export interface State {
  user?: User;
}
export interface AuthenticatedState {
  user: User;
}

export interface User {
  oid: string;
  name: string;
  email: string;
}
