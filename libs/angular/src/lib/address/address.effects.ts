import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap, reduce, switchMap, tap } from 'rxjs';
import { notifyUserSuccess } from '../util/notify-user';
import { catchBackendErrorAction } from '../util/operator/catch-backend-action';
import { addressActions } from './address.actions';
import { AddressService } from './address.service';

@Injectable()
export class AddressEffects {
	private actions$ = inject(Actions);

	constructor(
		private service: AddressService,
		private snackbar: MatSnackBar
	) { }

	create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(addressActions.create),
			mergeMap(({ value }) =>
				this.service.sendCreate(value).pipe(
					map((created) =>
						addressActions.createSuccess({
							value: created,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						addressActions.createError
					)
				)
			)
		)
	);

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(addressActions.delete),
			mergeMap(({ value }) =>
				this.service.sendDelete(value._id).pipe(
					map(() =>
						addressActions.deleteSuccess({ value, success: true })
					),
					tap(() =>
						notifyUserSuccess(
							this.snackbar,
							`Address ${value.city} deleted with success !`
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						addressActions.deleteError,
						{ value }
					)
				)
			)
		)
	);

	list$ = createEffect(() =>
		this.actions$.pipe(
			ofType(addressActions.list),
			switchMap(() =>
				this.service.sendList().pipe(
					switchMap((results) =>
						from(results).pipe(
							reduce(
								(acc, value) =>
									Object.assign(acc, { [value._id!]: value }),
								{}
							),
							map((values) =>
								addressActions.listSuccess({
									values,
									success: true
								})
							)
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						addressActions.listError
					)
				)
			)
		)
	);

	get$ = createEffect(() =>
		this.actions$.pipe(
			ofType(addressActions.get),
			switchMap(({ valueId }) =>
				this.service.sendGet(valueId).pipe(
					map((value) =>
						addressActions.getSuccess({ value, success: true })
					),
					catchBackendErrorAction(
						this.snackbar,
						addressActions.getError
					)
				)
			)
		)
	);

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(addressActions.update),
			mergeMap(({ value }) =>
				this.service.sendUpdate(value).pipe(
					map((updated) =>
						addressActions.updateSuccess({
							value: updated,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						addressActions.updateError
					)
				)
			)
		)
	);
}
