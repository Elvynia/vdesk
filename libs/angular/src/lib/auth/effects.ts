import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, map, switchMap, tap } from 'rxjs';
import { catchBackendErrorAction } from '../util/operator/catch-backend-action';
import { authActions } from './actions';
import { AuthService } from './service';

@Injectable()
export class AuthEffects {
	private actions$ = inject(Actions);

	constructor(protected authService: AuthService,
		protected snackbar: MatSnackBar, protected router: Router, private dialog: MatDialog) {
	}

	login$ = createEffect(() => this.actions$.pipe(
		ofType(authActions.login),
		switchMap(({ request }) => this.authService.login(request).pipe(
			map((value) => authActions.loginSuccess({
				value,
				success: true
			})),
			catchBackendErrorAction(this.snackbar, authActions.loginError)
		))
	));

	changePassword$ = createEffect(() => this.actions$.pipe(
		ofType(authActions.changeExpiredPassword),
		switchMap(({ request }) => this.authService.changeExpiredPassword(request).pipe(
			map(() => authActions.changeExpiredPasswordSuccess({
				success: true
			})),
			catchBackendErrorAction(this.snackbar, authActions.changeExpiredPasswordError)
		))
	));

	logout$ = createEffect(() => this.actions$.pipe(
		ofType(authActions.logout),
		tap(() => {
			this.dialog.closeAll();
			this.router.navigate(['login']);
		}),
		switchMap(() => EMPTY)
	), { dispatch: false });
}
