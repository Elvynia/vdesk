import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, map, reduce, switchMap } from "rxjs";
import { catchBackendErrorAction } from "../../util/operator/catch-backend-action";
import { InvoiceService } from "../invoice.service";
import { invoicePendingActions } from "./invoice-pending.action";


export const invoiceEffectListenActive = createEffect(
	(
		actions$ = inject(Actions),
		service = inject(InvoiceService),
		snackbar = inject(MatSnackBar)
	) =>
		actions$.pipe(
			ofType(invoicePendingActions.listenPending),
			switchMap(() => service.listenPending().pipe(
				switchMap((results) =>
					from(results).pipe(
						reduce(
							(acc, entry) =>
								Object.assign(acc, { [entry.key]: entry.value }),
							{}
						),
						map((values) =>
							invoicePendingActions.listenPendingMessage({
								values,
								success: true
							})
						)
					)
				),
				catchBackendErrorAction(
					snackbar,
					invoicePendingActions.listenPendingError
				)
			))
		),
	{ functional: true }
);
