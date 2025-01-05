import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { defer, retry, switchMap } from 'rxjs';
import { DashConfig } from '../config';
import { AuthService } from './service';

export function authHttpInterceptor(): HttpInterceptorFn {
	return (req: HttpRequest<any>, next: HttpHandlerFn) => {
		const authService = inject(AuthService);
		const config = inject(DashConfig);
		if (authService.authenticated && req.url.includes(config.apiUrl)) {
			const handle = () => {
				return defer(() => next(req.clone({
					headers: authService.apiHeaders
				}))).pipe(
					retry({
						count: 1,
						delay: (error: HttpErrorResponse) => {
							if (authService.authenticated && error.status === 401) {
								return authService.getRefreshToken();
							}
							throw error;
						}
					})
				);
			}
			if (authService.refreshing) {
				return authService.getRefreshToken().pipe(
					switchMap(() => handle())
				)
			} else {
				return handle();
			}
		}
		return next(req);
	}
}
