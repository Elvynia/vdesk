import { Chunk } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiActionError, ApiActionId, ApiActionListSuccess, ApiActionSave, ApiActionSuccess, } from '../util/api.action';

export const chunkActions = createActionGroup({
	source: 'Chunk',
	events: {
		'Create': props<ApiActionSave<Chunk>>(),
		'Create Success': props<ApiActionSave<Chunk> & ApiActionSuccess>(),
		'Create Error': props<ApiActionSave<Chunk> & ApiActionError>(),
		'Delete': props<ApiActionSave<Chunk>>(),
		'Delete Success': props<ApiActionSave<Chunk> & ApiActionSuccess>(),
		'Delete Error': props<ApiActionSave<Chunk> & ApiActionError>(),
		'Get': props<ApiActionId>(),
		'Get Success': props<ApiActionSave<Chunk> & ApiActionSuccess>(),
		'Get Error': props<ApiActionError>(),
		'List': emptyProps(),
		'List Success': props<ApiActionListSuccess<Chunk>>(),
		'List Error': props<ApiActionError>(),
		'Update': props<ApiActionSave<Chunk>>(),
		'Update Success': props<ApiActionSave<Chunk> & ApiActionSuccess>(),
		'Update Error': props<ApiActionSave<Chunk> & ApiActionError>(),
	},
});
