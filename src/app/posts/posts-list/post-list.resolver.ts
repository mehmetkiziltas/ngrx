import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { mapTo, Observable, of, pipe } from 'rxjs';
import { PostsState } from '../state/posts.state';

import * as fromPostAction from '../state/posts.actions';

@Injectable({ providedIn: 'root' })
export class PostListResolver implements Resolve<null> {
  constructor(private store: Store<PostsState>) {}
  resolve(route: ActivatedRouteSnapshot): Observable<null> {
    this.store.dispatch(fromPostAction.loadPosts());
    return of(null);
  }
}
