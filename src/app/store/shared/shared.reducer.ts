import { Action, createReducer, on } from '@ngrx/store';
import * as loadingSpinnerActions from './shared.actions';
import { initialState, SharedState } from './shared.state';

const loadingSpinnerReducer = createReducer(
  initialState,
  on(loadingSpinnerActions.setLoadingAction, (state, action) => ({
    ...state,
    isLoading: action.isLoading,
  }))
);

export function sharedReducer(state: SharedState | undefined, action: Action) {
  return loadingSpinnerReducer(state, action);
}
