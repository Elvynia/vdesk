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

export type AuthState = Record<'auth', AuthEntity>;

export const isAuthenticated = (state: AuthEntity) => !!state.apiToken;
export const isAuthAdmin = (state: AuthEntity) => state.authorities?.includes('ROLE_ADMIN');
export const selectAuth = (state: AuthState) => state.auth;
export const selectAuthIsAdmin = (state: AuthState) => isAuthAdmin(state.auth);
export const selectAuthenticated = (state: AuthState) => !!state.auth.apiToken;
