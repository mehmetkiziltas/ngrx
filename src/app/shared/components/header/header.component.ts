import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AuthState } from 'src/app/auth/state/auth.state';
import { AppState } from 'src/app/store/app.state';

import * as fromAuthAction from '../../../auth/state/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$ = this.store.select(isAuthenticated);
  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(fromAuthAction.logout());
    this.store.dispatch(fromAuthAction.clearUser());
  }
}
