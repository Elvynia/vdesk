import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { finalize, first } from 'rxjs';
import { passwordConfirmValidatorFn } from '../../account/validator/password-confirm.validator';
import { passwordDifferentValidatorFn } from '../../account/validator/password-different.validator';
import { passwordPolicyValidatorFn, SpecialChars } from '../../account/validator/password-policy.validator';
import { LoadingDirective } from '../../loading/loading.directive';
import { authActions } from '../actions';

@Component({
	selector: 'lv-auth-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css'],
	imports: [
    LoadingDirective,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
]
})
export class AuthFormComponent implements OnInit {
	@Input({ transform: coerceBooleanProperty }) admin: boolean;
	@Input({ transform: coerceBooleanProperty }) forgotPassword: boolean;
	@Input() redirectUrl?: string[];
	expiredPassword: boolean;
	group!: FormGroup;
	pending: boolean;
	specialChars: string;

	constructor(private store: Store<any>, private actions: Actions, private formBuilder: FormBuilder,
		private router: Router) {
		this.admin = false;
		this.forgotPassword = false;
		this.expiredPassword = false;
		this.pending = false;
		this.specialChars = SpecialChars;
		this.reset();
	}

	ngOnInit(): void {
		this.actions.pipe(
			ofType(authActions.passwordExpired)
		).subscribe(({ username }) => {
			this.expiredPassword = true;
			this.reset(username);
		});
	}

	backToLogin() {
		this.forgotPassword = false;
	}

	resetPassword() {
		this.forgotPassword = true;
	}

	reset(username?: string) {
		if (this.expiredPassword) {
			this.group = this.formBuilder.nonNullable.group({
				username: [username, [Validators.required]],
				oldPassword: ['', [Validators.required]],
				password: ['', [Validators.required, passwordPolicyValidatorFn()]],
				confirmPassword: ['', [Validators.required]]
			}, {
				validators: [
					passwordConfirmValidatorFn('password', 'confirmPassword'),
					passwordDifferentValidatorFn('oldPassword', 'password')
				]
			});
		} else {
			this.group = this.formBuilder.nonNullable.group({
				username: ['', [Validators.required]],
				password: ['', [Validators.required]],
				rememberMe: [false]
			});
		}
	}

	submit() {
		this.pending = true;
		if (this.expiredPassword) {
			this.store.dispatch(authActions.changeExpiredPassword({ request: this.group.getRawValue() }));
			this.actions.pipe(
				ofType(authActions.changeExpiredPasswordSuccess, authActions.changeExpiredPasswordError),
				first(),
				finalize(() => this.pending = false)
			).subscribe((action) => {
				if (action.type === '[Auth] Change expired password success') {
					this.expiredPassword = false;
				}
			});
		} else if (this.forgotPassword) {
			// TODO: forgotPassword action.
		} else {
			this.store.dispatch(authActions.login({ request: this.group.getRawValue() }));
			this.actions.pipe(
				ofType(authActions.loginError, authActions.loginSuccess),
				first(),
				finalize(() => this.pending = false)
			).subscribe((action) => {
				if (action.type === '[Auth] Login Success' && this.redirectUrl?.length) {
					this.router.navigate(this.redirectUrl);
				} else {
					this.group.reset();
				}
			});
		}
	}
}
