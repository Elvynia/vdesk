import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap, reduce, switchMap, tap } from 'rxjs';
import { notifyUserSuccess } from '../util/notify-user';
import { catchBackendErrorAction } from '../util/operator/catch-backend-action';
import { companyTypeActions } from './company-type.actions';
import { CompanyTypeService } from './company-type.service';

@Injectable()
export class CompanyTypeEffects {
	private actions$ = inject(Actions);

	constructor(
		private service: CompanyTypeService,
		private snackbar: MatSnackBar
	) { }

	create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyTypeActions.create),
			mergeMap(({ value }) =>
				this.service.sendCreate(value).pipe(
					map((created) =>
						companyTypeActions.createSuccess({
							value: created,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						companyTypeActions.createError
					)
				)
			)
		)
	);

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyTypeActions.delete),
			mergeMap(({ value }) =>
				this.service.sendDelete(value._id).pipe(
					map(() =>
						companyTypeActions.deleteSuccess({
							value,
							success: true,
						})
					),
					tap(() =>
						notifyUserSuccess(
							this.snackbar,
							`CompanyType ${value.name} deleted with success !`
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						companyTypeActions.deleteError,
						{ value }
					)
				)
			)
		)
	);

	list$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyTypeActions.list),
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
								companyTypeActions.listSuccess({
									values,
									success: true
								})
							)
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						companyTypeActions.listError
					)
				)
			)
		)
	);

	get$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyTypeActions.get),
			switchMap(({ valueId }) =>
				this.service.sendGet(valueId).pipe(
					map((value) =>
						companyTypeActions.getSuccess({ value, success: true })
					),
					catchBackendErrorAction(
						this.snackbar,
						companyTypeActions.getError
					)
				)
			)
		)
	);

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(companyTypeActions.update),
			mergeMap(({ value }) =>
				this.service.sendUpdate(value).pipe(
					map((updated) =>
						companyTypeActions.updateSuccess({
							value: updated,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						companyTypeActions.updateError
					)
				)
			)
		)
	);
}
