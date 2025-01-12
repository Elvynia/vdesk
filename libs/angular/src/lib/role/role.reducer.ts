import { Role } from '@lv/common';
import { Action, createReducer, on } from '@ngrx/store';
import { authActions } from '../auth/actions';
import { roleActions } from './role.actions';

const initState = {};

export const roleReducer = (
	state: Record<string, Role> | undefined,
	action: Action
) =>
	createReducer<Record<string, Role>>(
		initState,
		on(
			roleActions.createSuccess,
			roleActions.getSuccess,
			roleActions.updateSuccess,
			(state, { value }) => ({
				...state,
				[value._id]: value,
			})
		),
		on(
			roleActions.delete,
			roleActions.deleteError,
			(state, { value, type }) => ({
				...state,
				[value._id]: {
					...state[value._id],
					pending: roleActions.delete.type === type,
				},
			})
		),
		on(roleActions.listSuccess, (state, { values }) => ({
			...state,
			...values,
		})),
		on(roleActions.deleteSuccess, (state, { value }) => {
			const values = { ...state };
			delete values[value._id];
			return values;
		}),
		on(authActions.logout, () => ({ ...initState }))
	)(state, action);
