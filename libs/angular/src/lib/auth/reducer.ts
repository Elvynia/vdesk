import { Action, createReducer, on } from "@ngrx/store";
import { authActions } from "./actions";
import { AuthEntity } from "./type";

const initState = { authorities: [] };

export const authReducer = (state: AuthEntity | undefined, action: Action) => createReducer<AuthEntity>(
	initState,
	on(authActions.loginSuccess, authActions.refreshSuccess, (_, { auth }) => ({ ...auth })),
	on(authActions.logout, authActions.loginError, authActions.refreshError, () => ({ ...initState }))
)(state, action);
