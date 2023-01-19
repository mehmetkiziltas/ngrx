import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_FEATURE_KEY = 'auth';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getAuth = createSelector(
  getAuthState,
  (state: AuthState) => state.user
);

export const getAuthError = createSelector(
  getAuthState,
  (state: AuthState) => state?.error
);

export const isAuthenticated = createSelector(
  getAuthState,
  (state: AuthState) => !!state?.user
);
