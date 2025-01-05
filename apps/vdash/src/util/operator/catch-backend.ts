import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, catchError, switchMap } from 'rxjs';
import { handleBackendError } from '../api.error';
import { notifyUserWarning } from '../notify-user';

export function catchBackendError(snackBar: MatSnackBar) {
	return <T>(source: Observable<T>) =>
		source.pipe(catchError((response) => handleBackendError(response).pipe(
			switchMap((reason) => {
				notifyUserWarning(snackBar, reason);
				return EMPTY;
			})
		)));
}
