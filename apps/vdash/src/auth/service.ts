import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { jwtDecode } from "jwt-decode";
import { AsyncSubject, EMPTY, Observable, catchError, first, map, tap } from "rxjs";
import { DashConfig } from "../config";
import { notifyUserWarning } from "../util/notify-user";
import { authActions } from "./actions";
import { AuthState, ChangePasswordRequest, HasAuthState, LoginRequest } from "./type";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	url: string;
	protected auth!: AuthState;
	protected _refreshing: boolean;
	protected _initialized!: AsyncSubject<AuthState>;

	get apiHeaders() {
		let headers: HttpHeaders = this.baseHeaders;
		headers = headers.append('Authorization', 'Bearer ' + this.auth?.apiToken);
		return headers;
	}

	get authenticated() {
		return !!this.auth?.apiToken;
	}

	get baseHeaders() {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Access-Control-Allow-Origin', '*');
		return headers;
	}

	get initilized() {
		return !!this._initialized;
	}

	get refreshing() {
		return this._refreshing;
	}

	constructor(private httpClient: HttpClient, private snackBar: MatSnackBar,
		private store: Store<HasAuthState>, private actions: Actions, config: DashConfig) {
		this.resetAuth();
		this.url = config.apiUrl + config.apiPath + '/auth';
		this._refreshing = false;
	}

	initialize(): Observable<AuthState> {
		if (!this._initialized) {
			const stored = localStorage.getItem(this.getAuthKey());
			this._initialized = new AsyncSubject();
			if (stored) {
				const auth = JSON.parse(stored) as AuthState;
				this.setAuth(this.parseAuth(auth));
				this.store.dispatch(authActions.loginSuccess({ auth }));
			} else {
				this.resetAuth();
			}
			this._initialized.next(this.auth);
			this._initialized.complete();
		}
		return this._initialized;
	}

	changeExpiredPassword(request: ChangePasswordRequest) {
		return this.httpClient.post<AuthState>(this.url + '/expiry_change', request, {
			headers: this.baseHeaders
		});
	}

	login(request: LoginRequest) {
		return this.httpClient.post<AuthState>(this.url + '/login', request, {
			headers: this.baseHeaders
		}).pipe(
			catchError((response: HttpErrorResponse) => {
				if (response.status === 401 && response.error.passwordExpired) {
					this.store.dispatch(authActions.passwordExpired({ username: request.username }));
				}
				throw response;
			}),
			map(this.parseAuth),
			map((auth) => this.setAuth(auth, request.rememberMe))
		);
	}

	logout() {
		this.clearStore();
		this.store.dispatch(authActions.logout());
	}

	getRefreshToken(): Observable<any> {
		const refreshDone$ = this.actions.pipe(
			ofType(authActions.refreshSuccess, authActions.refreshError),
			first()
		);
		if (!this.refreshing) {
			this._refreshing = true;
			const data = new HttpParams()
				.append('token', this.auth!.apiToken!)
				.append('refresh', this.auth!.refreshToken!);
			refreshDone$.subscribe(() => this._refreshing = false);
			return this.httpClient.post<AuthState>(this.url + '/refresh_token', data).pipe(
				map(this.parseAuth),
				tap((auth) => {
					this.setAuth(auth);
					this.store.dispatch(authActions.refreshSuccess({ auth }));
				}),
				catchError(() => {
					this.store.dispatch(authActions.refreshError());
					this.timeout();
					return EMPTY;
				})
			);
		}
		return refreshDone$;
	}

	timeout() {
		this.logout();
		notifyUserWarning(this.snackBar, 'Votre session a expirée. Veuillez vous reconnecter.');
	}

	private clearStore() {
		localStorage.removeItem(this.getAuthKey());
	}

	protected getAuthKey() {
		return 'VDESK_AUTH_KEY';
	};

	private parseAuth(auth: AuthState) {
		const token = jwtDecode(auth.apiToken!);
		return {
			...auth,
			authorities: token.aud ? (token.aud as string).split(',') : []
		}
	}

	protected resetAuth() {
		this.auth = { authorities: [] };
	}

	protected setAuth(auth: AuthState, rememberMe: boolean = false) {
		this.auth = auth;
		if (rememberMe || localStorage.getItem(this.getAuthKey())) {
			localStorage.setItem(this.getAuthKey(), JSON.stringify(auth));
		}
		return this.auth;
	}
}
