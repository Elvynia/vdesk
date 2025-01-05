export interface LoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export interface ChangePasswordRequest extends LoginRequest {
    oldPassword: string;
}

export interface AuthState {
    apiToken?: string;
    refreshToken?: string;
    authorities: string[];
}

export type HasAuthState = Record<'auth', AuthState>;

export const isAuthAdmin = (state: AuthState) => state.authorities?.includes('ROLE_ADMIN');
export const selectAuth = (state: HasAuthState) => state.auth;
export const selectAuthIsAdmin = (state: HasAuthState) => isAuthAdmin(state.auth);
export const selectAuthenticated = (state: HasAuthState) => !!state.auth.apiToken;
