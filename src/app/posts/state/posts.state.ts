import { Post } from 'src/app/models/posts.models';

export interface PostsState {
  posts: Post[];
}

export const postsInitialState = {
  posts: [
    {
      id: 1,
      title: 'Post 1',
      body: 'Post 1 body',
      userId: 1,
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Post 2 body',
      userId: 1,
    },
    {
      id: 3,
      title: 'Post 3',
      body: 'Post 3 body',
      userId: 1,
    },
  ],
  loading: false,
  error: null,
};
