import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap, reduce, switchMap, tap } from 'rxjs';
import { notifyUserSuccess } from '../util/notify-user';
import { catchBackendErrorAction } from '../util/operator/catch-backend-action';
import { missionActions } from './mission.actions';
import { MissionService } from './mission.service';

@Injectable()
export class MissionEffects {
	private actions$ = inject(Actions);

	constructor(
		private service: MissionService,
		private snackbar: MatSnackBar,
	) { }

	create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(missionActions.create),
			mergeMap(({ value }) =>
				this.service.sendCreate(value).pipe(
					map((created) =>
						missionActions.createSuccess({
							value: created,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						missionActions.createError
					)
				)
			)
		)
	);

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(missionActions.delete),
			mergeMap(({ value }) =>
				this.service.sendDelete(value._id).pipe(
					map(() =>
						missionActions.deleteSuccess({ value, success: true })
					),
					tap(() =>
						notifyUserSuccess(
							this.snackbar,
							`Mission ${value.name} deleted with success !`
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						missionActions.deleteError,
						{ value }
					)
				)
			)
		)
	);

	list$ = createEffect(() =>
		this.actions$.pipe(
			ofType(missionActions.list),
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
								missionActions.listSuccess({
									values,
									success: true
								})
							)
						)
					),
					catchBackendErrorAction(
						this.snackbar,
						missionActions.listError
					)
				)
			)
		)
	);

	get$ = createEffect(() =>
		this.actions$.pipe(
			ofType(missionActions.get),
			switchMap(({ valueId }) =>
				this.service.sendGet(valueId).pipe(
					map((value) =>
						missionActions.getSuccess({ value, success: true })
					),
					catchBackendErrorAction(
						this.snackbar,
						missionActions.getError
					)
				)
			)
		)
	);

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(missionActions.update),
			mergeMap(({ value }) =>
				this.service.sendUpdate(value).pipe(
					map((updated) =>
						missionActions.updateSuccess({
							value: updated,
							success: true,
						})
					),
					catchBackendErrorAction(
						this.snackbar,
						missionActions.updateError
					)
				)
			)
		)
	);
}
