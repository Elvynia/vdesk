import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionCreator, Creator } from '@ngrx/store';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { handleBackendError } from '../api.error';
import { notifyUserWarning } from '../notify-user';

export function catchBackendErrorAction<
	AC extends ActionCreator<A, C>,
	A extends string,
	C extends Creator<any[], any>
>(snackBar: MatSnackBar, errorAction: AC, params: any = {}) {
	return <T>(source: Observable<T>) =>
		source.pipe(catchError((response) => handleBackendError(response).pipe(
			switchMap((reason) => {
				notifyUserWarning(snackBar, reason);
				return of(errorAction({ reason, ...params }));
			})
		)));
}
