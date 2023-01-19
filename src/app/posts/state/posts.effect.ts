import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { PostsService } from '../services/posts.service';

import * as fromPostActions from './posts.actions';

@Injectable({ providedIn: 'root' })
export class PostsEffects {
  constructor(private postService: PostsService, private actions$: Actions) {}

  effectName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromPostActions.loadPosts),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((data) => fromPostActions.loadPostSuccess(data)),
          catchError((error) => of(fromPostActions.loadPostFail({ error })))
        )
      )
    );
  });
}
