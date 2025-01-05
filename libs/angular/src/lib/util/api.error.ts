import { HttpErrorResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { EMPTY, Observable, TimeoutError, from, map, of } from 'rxjs';

export const handleBackendError = (response: HttpErrorResponse): Observable<string> => {
	let reason = 'Erreur technique inconnue. Veuillez contacter l\'administrateur';
	if (response.error && !(response.error instanceof ProgressEvent)) {
		try {
			if (typeof response.error === 'string') {
				reason = JSON.parse(response.error).message;
			} else if (response.error instanceof Blob) {
				return from(response.error.text()).pipe(
					map((e) => JSON.parse(e).message)
				);
			} else if (typeof response.error === 'object') {
				reason = response.error.message;
			}
		} catch (e) {
			isDevMode() && console.warn('Could not parse error from backend :', response.error, e);
		}
	} else if (response instanceof TimeoutError) {
		reason = 'Proposition de regroupement annulée (temps maximal dépassé).'
	} else if (response.status === 0) {
		reason = 'Impossible de contacter le serveur, vous êtes peut-être hors ligne.';
	} else if (response.status === 401) {
		return EMPTY;
	} else if (response.status === 403) {
		reason = 'Accès interdit.';
	} else if (response.status === 413) {
		reason = 'Impossible de télécharger, le fichier est trop volumineux.';
	} else {
		isDevMode() && console.log('Error in effect : ', response);
	}
	return of(reason);
};
