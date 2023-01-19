import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthRequest } from 'src/app/models/auth.models';
import { setLoadingAction } from 'src/app/store/shared/shared.actions';
import * as fromAuthAction from '../state/auth.actions';
import { AuthState } from '../state/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    const request: AuthRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.store.dispatch(setLoadingAction(true));
    this.store.dispatch(fromAuthAction.loginStart({ authRequest: request }));
  }
}
