import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/models/auth.models';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';

import * as fromAuthAction from '../state/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_CONFIG.apiKey}`;

    return this.http.post<AuthResponse>(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  signUp(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_CONFIG.apiKey}`;

    return this.http.post<AuthResponse>(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }

  formatUser(data: AuthResponse) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    return new User(data.localId, data.email, data.idToken, expirationDate);
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const expirationDate =
      new Date(user.expirationDate).getTime() - new Date().getTime();
    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(fromAuthAction.autoLogout());
    }, expirationDate);
  }

  getUserFromLocalStorage() {
    const userInStorage = JSON.parse(localStorage.getItem('user') || '{}');
    if (userInStorage) {
      const user = new User(
        userInStorage.localId,
        userInStorage.email,
        userInStorage.token,
        new Date(userInStorage.expirationDate)
      );
      this.runTimeoutInterval(user);
      return user;
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
