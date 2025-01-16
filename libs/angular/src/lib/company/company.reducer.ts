import { Company } from '@lv/common';
import { Action, createReducer, on } from '@ngrx/store';
import { authActions } from '../auth/actions';
import { companyActions } from './company.actions';

const initState = {};

export const companyReducer = (
	state: Record<string, Company> | undefined,
	action: Action
) =>
	createReducer<Record<string, Company>>(
		initState,
		on(
			companyActions.createSuccess,
			companyActions.getSuccess,
			companyActions.updateSuccess,
			(state, { value }) => ({
				...state,
				[value._id]: value,
			})
		),
		on(
			companyActions.delete,
			companyActions.deleteError,
			(state, { value, type }) => ({
				...state,
				[value._id]: {
					...state[value._id],
					pending: companyActions.delete.type === type,
				},
			})
		),
		on(companyActions.listSuccess, (state, { values }) => ({
			...state,
			...values,
		})),
		on(companyActions.deleteSuccess, (state, { value }) => {
			const values = { ...state };
			delete values[value._id];
			return values;
		}),
		on(authActions.logout, () => ({ ...initState }))
	)(state, action);
