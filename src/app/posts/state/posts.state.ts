import { Post } from 'src/app/models/posts.models';
import { postsReducer } from './posts.reducer';
import { POSTS_FEATURE_KEY } from './posts.selector';

export interface PostsState {
  posts: Post[];
}

export const postReducer = {
  [POSTS_FEATURE_KEY]: postsReducer,
};

export const postsInitialState = {
  posts: [],
};
