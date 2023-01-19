import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditPostResolver } from './edit-post/edit-post.resolve';
import { PostListResolver } from './posts-list/post-list.resolver';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsEffects } from './state/posts.effect';
import { postsReducer } from './state/posts.reducer';
import { POSTS_FEATURE_KEY } from './state/posts.selector';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { PostListResolver },
    children: [
      {
        path: 'add',
        component: AddPostComponent,
      },
      {
        path: ':id/edit',
        component: EditPostComponent,
        resolve: { data: EditPostResolver },
      },
    ],
  },
];

@NgModule({
  declarations: [PostsListComponent, AddPostComponent, EditPostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POSTS_FEATURE_KEY, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule {}
