import { Mission } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiActionError, ApiActionId, ApiActionListSuccess, ApiActionSave, ApiActionSuccess, } from '../util/api.action';

export const missionActions = createActionGroup({
	source: 'Mission',
	events: {
		'Create': props<ApiActionSave<Mission>>(),
		'Create Success': props<ApiActionSave<Mission> & ApiActionSuccess>(),
		'Create Error': props<ApiActionSave<Mission> & ApiActionError>(),
		'Delete': props<ApiActionSave<Mission>>(),
		'Delete Success': props<ApiActionSave<Mission> & ApiActionSuccess>(),
		'Delete Error': props<ApiActionSave<Mission> & ApiActionError>(),
		'Get': props<ApiActionId>(),
		'Get Success': props<ApiActionSave<Mission> & ApiActionSuccess>(),
		'Get Error': props<ApiActionError>(),
		'List': emptyProps(),
		'List Success': props<ApiActionListSuccess<Mission>>(),
		'List Error': props<ApiActionError>(),
		'ListenActive': emptyProps(),
		'ListenActive Message': props<ApiActionListSuccess<Mission>>(),
		'ListenActive Error': props<ApiActionError>(),
		'Update': props<ApiActionSave<Mission>>(),
		'Update Success': props<ApiActionSave<Mission> & ApiActionSuccess>(),
		'Update Error': props<ApiActionSave<Mission> & ApiActionError>(),
	},
});
