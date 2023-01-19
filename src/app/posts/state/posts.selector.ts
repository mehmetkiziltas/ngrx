import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

export const POSTS_FEATURE_KEY = 'posts';

const selectPostSelector = createFeatureSelector<PostsState>(POSTS_FEATURE_KEY);

export const getPostById = (id: number) =>
  createSelector(selectPostSelector, (state) =>
    state.posts.find((p) => p.id === id)
  );

export const getPostList = createSelector(selectPostSelector, (state) => {
  return state.posts;
});
