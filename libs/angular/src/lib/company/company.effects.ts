import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap, reduce, switchMap, tap } from 'rxjs';
import { notifyUserSuccess } from '../util/notify-user';
import { catchBackendErrorAction } from '../util/operator/catch-backend-action';
import { companyActions } from './company.actions';
import { CompanyService } from './company.service';

@Injectable()
export class CompanyEffects {
	private actions$ = inject(Actions);

	constructor(
		private service: CompanyService,
		private snackbar: MatSnackBar
	) {}

	create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyActions.create),
			mergeMap(({ value }) =>
				this.service.sendCreate(value).pipe(
					map((created) =>
						companyActions.createSuccess({
							value: created,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						companyActions.createError
					)
				)
			)
		)
	);

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyActions.delete),
			mergeMap(({ value }) =>
				this.service.sendDelete(value._id).pipe(
					map(() =>
						companyActions.deleteSuccess({ value, success: true })
					),
					tap(() =>
						notifyUserSuccess(
							this.snackbar,
							`Company ${value.name} deleted with success !`
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						companyActions.deleteError,
						{ value }
					)
				)
			)
		)
	);

	list$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyActions.list),
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
								companyActions.listSuccess({ values })
							)
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						companyActions.listError
					)
				)
			)
		)
	);

	get$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyActions.get),
			switchMap(({ valueId }) =>
				this.service.sendGet(valueId).pipe(
					map((value) =>
						companyActions.getSuccess({ value, success: true })
					),
					catchBackendErrorAction(
						this.snackbar,
						companyActions.getError
					)
				)
			)
		)
	);

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyActions.update),
			mergeMap(({ value }) =>
				this.service.sendUpdate(value).pipe(
					map((updated) =>
						companyActions.updateSuccess({
							value: updated,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						companyActions.updateError
					)
				)
			)
		)
	);
}
