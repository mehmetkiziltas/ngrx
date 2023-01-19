import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/posts.models';

export const ADD_POST_ACTION = '[Posts] Add Post';

export const LOAD_POSTS = '[Posts] Load Posts';
export const LOAD_POST_SUCCESS = '[Posts] Load Post Success';
export const LOAD_POST_FAIL = '[Posts] Load Post Fail';

export const DELETE_POST_ACTION = '[Posts] Delete Post';

export const EDIT_POST_ACTION = '[Posts] Edit Post';

export const addPostAction = createAction(ADD_POST_ACTION, (post: Post) => ({
  post,
}));

export const editPostAction = createAction(EDIT_POST_ACTION, (post: Post) => ({
  post,
}));

export const deletePostAction = createAction(
  DELETE_POST_ACTION,
  (id: number) => ({ id })
);

export const loadPosts = createAction(LOAD_POSTS);

export const loadPostSuccess = createAction(
  LOAD_POST_SUCCESS,
  (posts: Post[]) => ({ posts })
);

export const loadPostFail = createAction(LOAD_POST_FAIL, (error: any) => ({
  error,
}));
