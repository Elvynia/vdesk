import { Action, createReducer, on } from "@ngrx/store";
import { authActions } from "./actions";
import { AuthState } from "./type";

const initState = { authorities: [] };

export const authReducer = (state: AuthState | undefined, action: Action) => createReducer<AuthState>(
	initState,
	on(authActions.loginSuccess, authActions.refreshSuccess, (_, { value }) => ({ ...value })),
	on(authActions.logout, authActions.loginError, authActions.refreshError, () => ({ ...initState }))
)(state, action);
