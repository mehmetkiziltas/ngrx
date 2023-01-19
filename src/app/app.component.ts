import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import * as fromAuthAction from './auth/state/auth.actions';
import { getAuthError } from './auth/state/auth.selector';
import { AppState } from './store/app.state';
import { selectSharedProperty } from './store/shared/shared.selector';
import * as fromSharedAction from './store/shared/shared.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  showLoadingSpinner$!: Observable<boolean>;
  authLoginError$ = new BehaviorSubject<string | null>('');
  private subscriptions: Subscription[] = [];
  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    const userLS = localStorage.getItem('user');
    if (userLS) {
      const user = JSON.parse(userLS);
      this.authService.formatUser(user);
      this.store.dispatch(fromAuthAction.loginSuccess({ user: user }));
    }
  }
  ngOnInit(): void {
    this.showLoadingSpinner$ = this.store.select(selectSharedProperty);
    const sub1 = this.store.select(getAuthError).subscribe((error) => {
      if (error) {
        const message = error.error.message;
        switch (message) {
          case 'EMAIL_NOT_FOUND':
            this.authLoginError$.next('Email not found');
            break;
          case 'INVALID_PASSWORD':
            this.authLoginError$.next('Invalid password');
            break;
          case 'USER_DISABLED':
            this.authLoginError$.next('User disabled');
            break;
          case 'EMAIL_EXISTS':
            this.authLoginError$.next('Email already exists');
            break;
          default:
            this.authLoginError$.next('Unknown error');
            break;
        }
      }
    });
    this.subscriptions.push(sub1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
