import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap, reduce, switchMap, tap } from 'rxjs';
import { notifyUserSuccess } from '../util/notify-user';
import { catchBackendErrorAction } from '../util/operator/catch-backend-action';
import { accountActions } from './account.actions';
import { AccountService } from './account.service';

@Injectable()
export class AccountEffects {
	private actions$ = inject(Actions);

	constructor(private service: AccountService, private snackbar: MatSnackBar) { }

	create$ = createEffect(() => this.actions$.pipe(
		ofType(accountActions.create),
		mergeMap(({ value }) => this.service.sendCreate(value).pipe(
			map((created) => accountActions.createSuccess({ value: created, success: true })),
			catchBackendErrorAction(this.snackbar, accountActions.createError)
		))
	));

	delete$ = createEffect(() => this.actions$.pipe(
		ofType(accountActions.delete),
		mergeMap(({ value }) => this.service.sendDelete(value._id).pipe(
			map(() => accountActions.deleteSuccess({ value, success: true })),
			tap(() => notifyUserSuccess(this.snackbar, `Account ${value.username} deleted with success !`)),
			catchBackendErrorAction(this.snackbar, accountActions.deleteError, { value })
		))
	));

	list$ = createEffect(() => this.actions$.pipe(
		ofType(accountActions.list),
		switchMap(() => this.service.sendList().pipe(
			switchMap((results) => from(results).pipe(
				reduce((acc, value) => Object.assign(acc, { [value._id!]: value }), {}),
				map((values) => accountActions.listSuccess({ values })),
			)),
			catchBackendErrorAction(this.snackbar, accountActions.listError)
		))
	));

	get$ = createEffect(() => this.actions$.pipe(
		ofType(accountActions.get),
		switchMap(({ valueId }) => this.service.sendGet(valueId).pipe(
			map((value) => accountActions.getSuccess({ value, success: true })),
			catchBackendErrorAction(this.snackbar, accountActions.getError)
		))
	));

	update$ = createEffect(() => this.actions$.pipe(
		ofType(accountActions.update),
		mergeMap(({ value }) => this.service.sendUpdate(value).pipe(
			map((updated) => accountActions.updateSuccess({ value: updated, success: true })),
			catchBackendErrorAction(this.snackbar, accountActions.updateError)
		))
	));
}
