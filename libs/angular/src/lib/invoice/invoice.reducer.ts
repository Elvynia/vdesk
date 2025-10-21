import { Invoice } from '@lv/common';
import { Action, createReducer, on } from '@ngrx/store';
import { authActions } from '../auth/actions';
import { invoiceActions } from './invoice.actions';

const initState = {};

export const invoiceReducer = (
	state: Record<string, Invoice> | undefined,
	action: Action
) =>
	createReducer<Record<string, Invoice>>(
		initState,
		on(
			invoiceActions.createSuccess,
			invoiceActions.getSuccess,
			invoiceActions.updateSuccess,
			(state, { value }) => ({
				...state,
				[value._id]: value,
			})
		),
		on(
			invoiceActions.delete,
			invoiceActions.deleteError,
			(state, { value, type }) => ({
				...state,
				[value._id]: {
					...state[value._id],
					pending: invoiceActions.delete.type === type,
				},
			})
		),
		on(invoiceActions.listSuccess, (state, { values }) => ({
			...state,
			...values,
		})),
		on(invoiceActions.deleteSuccess, (state, { value }) => {
			const values = { ...state };
			delete values[value._id];
			return values;
		}),
		on(authActions.logout, () => ({ ...initState }))
	)(state, action);
