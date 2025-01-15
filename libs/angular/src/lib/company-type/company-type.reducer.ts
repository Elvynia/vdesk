import { CompanyType } from '@lv/common';
import { Action, createReducer, on } from '@ngrx/store';
import { authActions } from '../auth/actions';
import { companyTypeActions } from './company-type.actions';

const initState = {};

export const companyTypeReducer = (
	state: Record<string, CompanyType> | undefined,
	action: Action
) =>
	createReducer<Record<string, CompanyType>>(
		initState,
		on(
			companyTypeActions.createSuccess,
			companyTypeActions.getSuccess,
			companyTypeActions.updateSuccess,
			(state, { value }) => ({
				...state,
				[value._id]: value,
			})
		),
		on(
			companyTypeActions.delete,
			companyTypeActions.deleteError,
			(state, { value, type }) => ({
				...state,
				[value._id]: {
					...state[value._id],
					pending: companyTypeActions.delete.type === type,
				},
			})
		),
		on(companyTypeActions.listSuccess, (state, { values }) => ({
			...state,
			...values,
		})),
		on(companyTypeActions.deleteSuccess, (state, { value }) => {
			const values = { ...state };
			delete values[value._id];
			return values;
		}),
		on(authActions.logout, () => ({ ...initState }))
	)(state, action);
