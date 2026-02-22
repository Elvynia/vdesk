import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap, reduce, switchMap, tap } from 'rxjs';
import { notifyUserSuccess } from '../util/notify-user';
import { catchBackendErrorAction } from '../util/operator/catch-backend-action';
import { chunkActions } from './chunk.actions';
import { ChunkService } from './chunk.service';

@Injectable()
export class ChunkEffects {
	private actions$ = inject(Actions);

	constructor(private service: ChunkService, private snackbar: MatSnackBar) { }

	create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(chunkActions.create),
			mergeMap(({ value }) =>
				this.service.sendCreate(value).pipe(
					map((created) =>
						chunkActions.createSuccess({
							value: created,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						chunkActions.createError
					)
				)
			)
		)
	);

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(chunkActions.delete),
			mergeMap(({ value }) =>
				this.service.sendDelete(value._id).pipe(
					map(() =>
						chunkActions.deleteSuccess({ value, success: true })
					),
					tap(() =>
						notifyUserSuccess(
							this.snackbar,
							`Chunk ${value.count} deleted with success !`
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						chunkActions.deleteError,
						{ value }
					)
				)
			)
		)
	);

	list$ = createEffect(() =>
		this.actions$.pipe(
			ofType(chunkActions.list),
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
								chunkActions.listSuccess({
									values,
									success: true
								})
							)
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						chunkActions.listError
					)
				)
			)
		)
	);

	get$ = createEffect(() =>
		this.actions$.pipe(
			ofType(chunkActions.get),
			switchMap(({ valueId }) =>
				this.service.sendGet(valueId).pipe(
					map((value) =>
						chunkActions.getSuccess({ value, success: true })
					),
					catchBackendErrorAction(
						this.snackbar,
						chunkActions.getError
					)
				)
			)
		)
	);

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(chunkActions.update),
			mergeMap(({ value }) =>
				this.service.sendUpdate({ ...value, pending: undefined }).pipe(
					map((updated) =>
						chunkActions.updateSuccess({
							value: updated,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						chunkActions.updateError
					)
				)
			)
		)
	);
}
