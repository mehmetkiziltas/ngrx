import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.models';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';

@Injectable({ providedIn: 'root' })
export class EditPostResolver implements Resolve<unknown> {
  constructor(private store: Store<AppState>) {}
  resolve(route: ActivatedRouteSnapshot): Observable<unknown> {
    const id = +route.paramMap.get('id')!;
    return this.store.select(getPostById(id))!;
  }
}
