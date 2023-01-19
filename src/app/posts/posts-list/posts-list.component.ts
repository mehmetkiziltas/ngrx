import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.models';
import { AppState } from 'src/app/store/app.state';

import * as fromPostsActions from '../state/posts.actions';
import { getPostList } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(getPostList);
  }

  deletePost(id: number) {
    this.store.dispatch(fromPostsActions.deletePostAction(id));
  }
}
