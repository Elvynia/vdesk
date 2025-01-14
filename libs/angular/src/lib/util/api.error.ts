import { HttpErrorResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { EMPTY, Observable, TimeoutError, from, map, of } from 'rxjs';

export const handleBackendError = (response: HttpErrorResponse): Observable<string> => {
	let reason = 'Erreur technique inconnue. Veuillez contacter l\'administrateur';
	if (response.error && !(response.error instanceof ProgressEvent)) {
		try {
			if (typeof response.error === 'string') {
				reason = JSON.parse(response.error).errors.map((e: any) => e.message).join(';');
			} else if (response.error instanceof Blob) {
				return from(response.error.text()).pipe(
					map((e) => JSON.parse(e).errors.map((e: any) => e.message).join(';'))
				);
			} else if (typeof response.error === 'object') {
				if (response.error.errors) {
					reason = response.error.errors.map((e: any) => e.message).join(';');
				} else {
					reason = response.error.message;
				}
			}
		} catch (e) {
			isDevMode() && console.warn('Could not parse error from backend :', response.error, e);
		}
	} else if (response instanceof TimeoutError) {
		reason = 'Timeout'
	} else if (response.status === 0) {
		reason = 'No connexion';
	} else if (response.status === 401) {
		return EMPTY;
	} else if (response.status === 403) {
		reason = 'Forbidden access';
	} else if (response.status === 413) {
		reason = 'File is too big';
	} else {
		isDevMode() && console.log('Error in effect : ', response);
	}
	return of(reason);
};
