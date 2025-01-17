import { Chunk } from '@lv/common';
import { Action, createReducer, on } from '@ngrx/store';
import { authActions } from '../auth/actions';
import { chunkActions } from './chunk.actions';

const initState = {};

export const chunkReducer = (
	state: Record<string, Chunk> | undefined,
	action: Action
) =>
	createReducer<Record<string, Chunk>>(
		initState,
		on(
			chunkActions.createSuccess,
			chunkActions.getSuccess,
			chunkActions.updateSuccess,
			(state, { value }) => ({
				...state,
				[value._id]: value,
			})
		),
		on(
			chunkActions.delete,
			chunkActions.deleteError,
			(state, { value, type }) => ({
				...state,
				[value._id]: {
					...state[value._id],
					pending: chunkActions.delete.type === type,
				},
			})
		),
		on(chunkActions.listSuccess, (state, { values }) => ({
			...state,
			...values,
		})),
		on(chunkActions.deleteSuccess, (state, { value }) => {
			const values = { ...state };
			delete values[value._id];
			return values;
		}),
		on(authActions.logout, () => ({ ...initState }))
	)(state, action);
