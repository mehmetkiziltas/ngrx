import { createReducer } from '@ngrx/store';
import { postsInitialState } from './posts.state';

const _postsReducer = createReducer(postsInitialState);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
