import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap, reduce, switchMap, tap } from 'rxjs';
import { notifyUserSuccess } from '../util/notify-user';
import { catchBackendErrorAction } from '../util/operator/catch-backend-action';
import { invoiceActions } from './invoice.actions';
import { InvoiceService } from './invoice.service';

@Injectable()
export class InvoiceEffects {
	private actions$ = inject(Actions);

	constructor(
		private service: InvoiceService,
		private snackbar: MatSnackBar
	) {}

	create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(invoiceActions.create),
			mergeMap(({ value }) =>
				this.service.sendCreate(value).pipe(
					map((created) =>
						invoiceActions.createSuccess({
							value: created,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						invoiceActions.createError
					)
				)
			)
		)
	);

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(invoiceActions.delete),
			mergeMap(({ value }) =>
				this.service.sendDelete(value._id).pipe(
					map(() =>
						invoiceActions.deleteSuccess({ value, success: true })
					),
					tap(() =>
						notifyUserSuccess(
							this.snackbar,
							`Invoice ${value.name} deleted with success !`
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						invoiceActions.deleteError,
						{ value }
					)
				)
			)
		)
	);

	list$ = createEffect(() =>
		this.actions$.pipe(
			ofType(invoiceActions.list),
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
								invoiceActions.listSuccess({ values })
							)
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						invoiceActions.listError
					)
				)
			)
		)
	);

	get$ = createEffect(() =>
		this.actions$.pipe(
			ofType(invoiceActions.get),
			switchMap(({ valueId }) =>
				this.service.sendGet(valueId).pipe(
					map((value) =>
						invoiceActions.getSuccess({ value, success: true })
					),
					catchBackendErrorAction(
						this.snackbar,
						invoiceActions.getError
					)
				)
			)
		)
	);

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(invoiceActions.update),
			mergeMap(({ value }) =>
				this.service.sendUpdate(value).pipe(
					map((updated) =>
						invoiceActions.updateSuccess({
							value: updated,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						invoiceActions.updateError
					)
				)
			)
		)
	);
}
