import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import * as AuthActions from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginStart, (state, action) => {
    return {
      ...state,
      authRequest: action.authRequest,
      isLoading: true,
      error: null,
    };
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      isLoading: false,
      error: null,
    };
  }),
  on(AuthActions.autoLogin, (state) => {
    return {
      ...state,
      isLoading: false,
      error: null,
    };
  }),
  on(AuthActions.loginFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(AuthActions.autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  }),

  on(AuthActions.clearUser, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(AuthActions.signupStart, (state, action) => {
    return {
      ...state,
      authRequest: action.authRequest,
      isLoading: true,
      error: null,
    };
  }),
  on(AuthActions.signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      isLoading: false,
      error: null,
    };
  }),
  on(AuthActions.signupFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
