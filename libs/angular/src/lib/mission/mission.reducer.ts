import { Mission } from '@lv/common';
import { Action, createReducer, on } from '@ngrx/store';
import { authActions } from '../auth/actions';
import { missionActions } from './mission.actions';

const initState = {};

export const missionReducer = (
	state: Record<string, Mission> | undefined,
	action: Action
) =>
	createReducer<Record<string, Mission>>(
		initState,
		on(
			missionActions.createSuccess,
			missionActions.getSuccess,
			missionActions.updateSuccess,
			(state, { value }) => ({
				...state,
				[value._id]: value,
			})
		),
		on(
			missionActions.delete,
			missionActions.deleteError,
			(state, { value, type }) => ({
				...state,
				[value._id]: {
					...state[value._id],
					pending: missionActions.delete.type === type,
				},
			})
		),
		on(missionActions.listSuccess, (state, { values }) => ({
			...state,
			...values,
		})),
		on(missionActions.deleteSuccess, (state, { value }) => {
			const values = { ...state };
			delete values[value._id];
			return values;
		}),
		on(authActions.logout, () => ({ ...initState }))
	)(state, action);
