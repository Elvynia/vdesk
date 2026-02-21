import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client, createClient } from 'graphql-ws';
import { firstValueFrom, map, Observable, Subscriber, tap } from 'rxjs';
import { AuthService } from './auth/service';
import { HasAuthState, selectAuthToken } from './auth/type';

@Injectable({ providedIn: 'root' })
export class SocketService<P extends Record<string, any> = Record<string, any>> {
	private client: Client;
	private lastToken?: string;

	constructor(
		private store: Store<HasAuthState>,
		private authService: AuthService
	) {
		this.client = createClient({
			url: 'ws://127.0.0.1:3000/api',
			connectionParams: () => firstValueFrom(this.store.select(selectAuthToken).pipe(
				tap((token) => this.lastToken = token),
				map((authorization) => ({
					authorization
				}))
			)),
			retryAttempts: 5,
			shouldRetry: (errOrCloseEvent) => {
				if (
					errOrCloseEvent
					&& typeof errOrCloseEvent === 'object'
					&& 'code' in errOrCloseEvent
				) {
					const isAuthError = errOrCloseEvent.code === 4401
						|| errOrCloseEvent.code === 1005
						|| errOrCloseEvent.code === 4403;

					if (isAuthError) {
						if (!this.lastToken || this.authService.doesTokenMatch(this.lastToken)) {
							this.authService.getRefreshToken().subscribe();
						}
						return true;
					}
				}
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

	subscribe<K extends string & keyof P>(name: K, query: string): Observable<P[K]> {
		return new Observable((observer: Subscriber<P[K]>) => {
			const unsubscribe = this.client.subscribe(
				{
					query: `subscription {
						${name} ${query}
					}`
				},
				{
					next: (data?: any) => {
						if (data?.data && data.data[name]) {
							observer.next(data.data[name])
						} else {
							observer.error(data?.errors)
						}
					},
					error: (err) => observer.error(err),
					complete: () => observer.complete(),
				}
			);
			return () => unsubscribe();
		});
	}
}
