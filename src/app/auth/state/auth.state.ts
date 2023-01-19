import { User } from 'src/app/models/user.model';

export interface AuthState {
  user: User | null;
  error: ErrorResponse | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};

export interface Error2 {
  message: string;
  domain: string;
  reason: string;
}

export interface Error {
  code: number;
  message: string;
  errors: Error2[];
}

export interface ErrorResponse {
  error: Error;
}
