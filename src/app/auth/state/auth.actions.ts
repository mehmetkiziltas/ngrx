import { createAction, props } from '@ngrx/store';
import { AuthRequest, AuthResponse } from 'src/app/models/auth.models';
import { User } from 'src/app/models/user.model';
import { ErrorResponse } from './auth.state';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';

export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';

export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';
export const SIGNUP_FAIL = '[Auth] Signup Fail';

export const LOGOUT = '[Auth] Logout';
export const CLEAR_USER = '[Auth] Clear User';

export const loginStart = createAction(
  LOGIN_START,
  props<{ authRequest: AuthRequest }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const loginFail = createAction(
  LOGIN_FAIL,
  props<{ error: ErrorResponse | null }>()
);

export const autoLogin = createAction(AUTO_LOGIN);
export const autoLogout = createAction(AUTO_LOGOUT);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ authRequest: AuthRequest }>()
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: User }>()
);

export const signupFail = createAction(
  SIGNUP_FAIL,
  props<{ error: ErrorResponse | null }>()
);

export const logout = createAction(LOGOUT);

export const clearUser = createAction(CLEAR_USER);
