import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client, createClient } from 'graphql-ws';
import { firstValueFrom, map, Observable, Subscriber } from 'rxjs';
import { AuthService } from './auth/service';
import { HasAuthState, selectAuthToken } from './auth/type';

@Injectable({ providedIn: 'root' })
export class SocketService {
	private client: Client;

	constructor(
		private store: Store<HasAuthState>,
		private authService: AuthService
	) {
		this.client = createClient({
			url: 'ws://localhost:3000/api',
			connectionParams: () => firstValueFrom(this.store.select(selectAuthToken).pipe(
				map((authorization) => ({
					authorization
				}))
			)),
			retryAttempts: 5,
			shouldRetry: (errOrCloseEvent) => {
				if (errOrCloseEvent instanceof Error) {
					this.authService.getRefreshToken().subscribe();
				}
				// if (
				// 	errOrCloseEvent
				// 	&& typeof errOrCloseEvent === 'object'
				// 	&& 'code' in errOrCloseEvent
				// ) {
				// 	const isAuthError = errOrCloseEvent.code === 4401
				// 		|| errOrCloseEvent.code === 1005
				// 		|| errOrCloseEvent.code === 4403;

				// 	if (isAuthError) {
				// 		console.log('Auth error detected, refreshing token...', errOrCloseEvent.code);
				// 		this.authService.getRefreshToken().subscribe();
				// 		return true;
				// 	}
				// }
				return true;
			},
			retryWait: async (retries) => {
				if (this.authService.refreshing) {
					await firstValueFrom(this.authService.getRefreshToken());
				}
				await new Promise(resolve =>
					setTimeout(resolve, Math.min(1000 * Math.pow(2, retries), 16000))
				);
			}
		});
	}

	subscribe<T>(name: string, query: string): Observable<T> {
		return new Observable((observer: Subscriber<T>) => {
			const unsubscribe = this.client.subscribe(
				{
					query: `subscription {
						${name} ${query}
					}`
				},
				{
					next: (data: any) => observer.next(data.data[name] as T),
					error: (err) => observer.error(err),
					complete: () => observer.complete(),
				}
			);
			return () => unsubscribe();
		});
	}
}
