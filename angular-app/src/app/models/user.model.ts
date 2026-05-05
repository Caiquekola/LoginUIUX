export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}
