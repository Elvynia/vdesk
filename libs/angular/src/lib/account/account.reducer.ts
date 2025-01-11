import { Account } from "@lv/common";
import { Action, createReducer, on } from "@ngrx/store";
import { authActions } from "../auth/actions";
import { accountActions } from "./account.actions";

const initState = {};

export const accountReducer = (state: Record<string, Account> | undefined, action: Action) => createReducer<Record<string, Account>>(
	initState,
	on(accountActions.createSuccess, accountActions.getSuccess, accountActions.updateSuccess, (state, { value }) => ({
		...state,
		[value._id]: value
	})),
	on(accountActions.delete, accountActions.deleteError, (state, { value, type }) => ({
		...state,
		[value._id]: {
			...state[value._id],
			pending: accountActions.delete.type === type
		}
	})),
	on(accountActions.listSuccess, (state, { values }) => ({
		...state,
		...values
	})),
	on(accountActions.deleteSuccess, (state, { value }) => {
		const values = { ...state };
		delete values[value._id];
		return values;
	}),
	on(authActions.logout, () => ({ ...initState }))
)(state, action);
