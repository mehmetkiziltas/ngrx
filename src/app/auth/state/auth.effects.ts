import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { setLoadingAction } from 'src/app/store/shared/shared.actions';
import { AuthService } from '../services/auth.service';
import * as fromAuthAction from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthAction.loginStart),
      exhaustMap((action) => {
        return this.authService
          .login(action.authRequest.email, action.authRequest.password)
          .pipe(
            map((authResponse: any) => {
              this.store.dispatch(setLoadingAction(false));
              localStorage.setItem('user', JSON.stringify(authResponse));
              const user = this.authService.formatUser(authResponse);
              return fromAuthAction.loginSuccess({ user: user });
            }),
            catchError((error) => {
              this.store.dispatch(setLoadingAction(false));
              return of(fromAuthAction.loginFail(error));
            })
          );
      })
    );
  });

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[fromAuthAction.loginSuccess, fromAuthAction.signupSuccess]),
        tap(() => {
          this.store.dispatch(setLoadingAction(false));
          this.store.dispatch(
            fromAuthAction.loginFail({
              error: null,
            })
          );
          this.store.dispatch(
            fromAuthAction.signupFail({
              error: null,
            })
          );
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  logoutRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromAuthAction.logout),
        tap(() => {
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthAction.signupStart),
      exhaustMap((action) => {
        return this.authService
          .signUp(action.authRequest.email, action.authRequest.password)
          .pipe(
            map((authResponse: any) => {
              this.store.dispatch(setLoadingAction(false));
              localStorage.setItem('user', JSON.stringify(authResponse));
              const user = this.authService.formatUser(authResponse);
              return fromAuthAction.signupSuccess({ user: user });
            }),
            catchError((error) => {
              this.store.dispatch(setLoadingAction(false));
              return of(fromAuthAction.signupFail(error));
            })
          );
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromAuthAction.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.store.dispatch(setLoadingAction(false));
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromAuthAction.autoLogin),
        map(() => {
          const user = this.authService.getUserFromLocalStorage();
          if (user) {
            return fromAuthAction.loginSuccess({ user: user });
          } else {
            return fromAuthAction.loginFail({ error: null });
          }
        })
      );
    },
    { dispatch: false }
  );
}
