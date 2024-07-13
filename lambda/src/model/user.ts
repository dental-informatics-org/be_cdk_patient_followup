export default interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
  active: boolean;
  last_login: Date | undefined;
}

export interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  active: boolean;
  last_login: Date | undefined;
}
