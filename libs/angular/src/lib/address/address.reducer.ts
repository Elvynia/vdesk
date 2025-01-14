import { Address } from '@lv/common';
import { Action, createReducer, on } from '@ngrx/store';
import { authActions } from '../auth/actions';
import { addressActions } from './address.actions';

const initState = {};

export const addressReducer = (
	state: Record<string, Address> | undefined,
	action: Action
) =>
	createReducer<Record<string, Address>>(
		initState,
		on(
			addressActions.createSuccess,
			addressActions.getSuccess,
			addressActions.updateSuccess,
			(state, { value }) => ({
				...state,
				[value._id]: value,
			})
		),
		on(
			addressActions.delete,
			addressActions.deleteError,
			(state, { value, type }) => ({
				...state,
				[value._id]: {
					...state[value._id],
					pending: addressActions.delete.type === type,
				},
			})
		),
		on(addressActions.listSuccess, (state, { values }) => ({
			...state,
			...values,
		})),
		on(addressActions.deleteSuccess, (state, { value }) => {
			const values = { ...state };
			delete values[value._id];
			return values;
		}),
		on(authActions.logout, () => ({ ...initState }))
	)(state, action);
