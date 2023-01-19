import { Action, createReducer, on } from '@ngrx/store';

import { Post, PostsState } from 'src/app/models/posts.models';
import * as fromPostsActions from './posts.actions';
import { postsInitialState } from './posts.state';

const _postsReducer = createReducer(
  postsInitialState,
  on(fromPostsActions.addPostAction, (state: any, action) => {
    let posts = { ...action.post };

    return {
      ...state,
      posts: [
        ...state.posts,
        (posts = {
          id: state.posts.length + 1,
          title: action.post.title,
          body: action.post.body,
          userId: action.post.userId,
        }),
      ],
    };
  }),
  on(fromPostsActions.editPostAction, (state: any, action) => {
    return {
      ...state,
      posts: [
        ...state.posts.map((p: Post) => {
          if (p.id === action.post.id) {
            return {
              ...p,
              title: action.post.title,
              body: action.post.body,
              userId: action.post.userId,
            };
          }
          return p;
        }),
      ],
    };
  }),
  on(fromPostsActions.deletePostAction, (state, action) => {
    return {
      ...state,
      posts: [...state.posts!.filter((p: Post) => p.id !== action.id)],
    };
  }),
  on(fromPostsActions.loadPosts, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromPostsActions.loadPostSuccess, (state) => {
    return {
      ...state,
      posts: state.posts,
      isLoading: false,
    };
  }),
  on(fromPostsActions.loadPostFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  })
);

export function postsReducer(state: PostsState | any, action: Action) {
  return _postsReducer(state, action);
}
