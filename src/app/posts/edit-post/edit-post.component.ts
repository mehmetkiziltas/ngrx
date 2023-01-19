import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

import * as fromPostsActions from '../state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm!: FormGroup;
  postSubs: Subscription[] = [];
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      id: new FormControl(null, [Validators.required, Validators.min(1)]),
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

    const sub1 = this.route.data.subscribe((data) => {
      this.postForm.patchValue(data['data']);
    });
    this.postSubs.push(sub1);
  }

  updatePost() {
    if (this.postForm.valid) {
      const post = this.postForm.value;
      this.store.dispatch(fromPostsActions.editPostAction(post));
    }
  }

  ngOnDestroy() {
    this.postSubs.forEach((sub) => sub.unsubscribe());
  }
}
