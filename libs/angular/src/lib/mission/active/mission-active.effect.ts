import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, map, reduce, switchMap } from "rxjs";
import { catchBackendErrorAction } from "../../util/operator/catch-backend-action";
import { MissionService } from "../mission.service";
import { missionActiveActions } from "./mission-active.action";


export const missionEffectListenActive = createEffect(
	(
		actions$ = inject(Actions),
		service = inject(MissionService),
		snackbar = inject(MatSnackBar)
	) =>
		actions$.pipe(
			ofType(missionActiveActions.listenActive),
			switchMap(() => service.listenActive().pipe(
				switchMap((results) =>
					from(results).pipe(
						reduce(
							(acc, entry) =>
								Object.assign(acc, { [entry.key]: entry.value }),
							{}
						),
						map((values) =>
							missionActiveActions.listenActiveMessage({
								values,
								success: true
							})
						)
					)
				),
				catchBackendErrorAction(
					snackbar,
					missionActiveActions.listenActiveError
				)
			))
		),
	{ functional: true }
);
