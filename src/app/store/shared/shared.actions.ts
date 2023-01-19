import { createAction } from '@ngrx/store';

export const SET_LOADING_ACTION = '[Shared] Set Loading';

export const setLoadingAction = createAction(
  SET_LOADING_ACTION,
  (isLoading: boolean) => ({ isLoading })
);
