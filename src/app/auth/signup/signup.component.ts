import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthRequest } from 'src/app/models/auth.models';
import { setLoadingAction } from 'src/app/store/shared/shared.actions';
import { AuthState } from '../state/auth.state';

import * as fromAuthAction from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  signup() {
    const request: AuthRequest = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };
    this.store.dispatch(setLoadingAction(true));
    this.store.dispatch(fromAuthAction.signupStart({ authRequest: request }));
  }
}
