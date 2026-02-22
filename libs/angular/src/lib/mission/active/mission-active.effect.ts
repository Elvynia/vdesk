import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { isEntity, Mission } from "@lv/common";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, map, reduce, switchMap } from "rxjs";
import { catchBackendErrorAction } from "../../util/operator/catch-backend-action";
import { missionActions } from "../mission.actions";
import { MissionService } from "../mission.service";


export const missionEffectListenActive = createEffect(
	(
		actions$ = inject(Actions),
		service = inject(MissionService),
		snackbar = inject(MatSnackBar)
	) =>
		actions$.pipe(
			ofType(missionActions.listenActive),
			switchMap(() => service.listenActive().pipe(
				switchMap((results) =>
					from(isEntity<Mission>(results) ? [results] : results).pipe(
						reduce(
							(acc, value) =>
								Object.assign(acc, { [value._id!]: value }),
							{}
						),
						map((values) =>
							missionActions.listenActiveMessage({
								values,
								success: true
							})
						)
					)
				),
				catchBackendErrorAction(
					snackbar,
					missionActions.listenActiveError
				)
			))
		),
	{ functional: true }
);
