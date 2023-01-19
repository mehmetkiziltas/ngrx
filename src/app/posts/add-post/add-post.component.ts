import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.models';
import { AppState } from 'src/app/store/app.state';

import * as fromAddPostsActions from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      body: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      userId: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  addPost() {
    if (this.postForm.invalid) {
      return;
    }
    const post: Post = {
      title: this.postForm.value.title,
      body: this.postForm.value.body,
      userId: this.postForm.value.userId,
    };
    this.store.dispatch(fromAddPostsActions.addPostAction(post));
  }
}
