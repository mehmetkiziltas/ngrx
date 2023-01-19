import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const SHARED_FEATURE_KEY = 'shared';

export const selectSharedSelector =
  createFeatureSelector<SharedState>(SHARED_FEATURE_KEY);

export const selectSharedProperty = createSelector(
  selectSharedSelector,
  (state: SharedState) => state?.isLoading
);
