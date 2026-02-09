import { AuthToken } from "@lv/common";

export interface LoginRequest {
	username: string;
	password: string;
	rememberMe?: boolean;
}

export interface ChangePasswordRequest extends LoginRequest {
	oldPassword: string;
}

export interface AuthEntity extends Partial<AuthToken> {
	username?: string;
	authorities: string[];
}

export interface HasAuthState {
	auth: AuthEntity;
}

export const isAuthenticated = (state: AuthEntity) => !!state.apiToken;
export const isAuthAdmin = (state: AuthEntity) => state.authorities?.includes('ROLE_ADMIN');
export const selectAuth = (state: HasAuthState) => state.auth;
export const selectAuthIsAdmin = (state: HasAuthState) => isAuthAdmin(state.auth);
export const selectAuthenticated = (state: HasAuthState) => !!state.auth.apiToken;
export const selectAuthToken = (state: HasAuthState) => state.auth.apiToken;
