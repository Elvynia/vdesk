import { Role } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
	ApiActionError,
	ApiActionId,
	ApiActionListSuccess,
	ApiActionSave,
	ApiActionSuccess,
} from '../util/api.action';

export const roleActions = createActionGroup({
	source: 'Role',
	events: {
		Create: props<ApiActionSave<Role>>(),
		'Create Success': props<ApiActionSave<Role> & ApiActionSuccess>(),
		'Create Error': props<ApiActionSave<Role>>(),
		Delete: props<ApiActionSave<Role>>(),
		'Delete Success': props<ApiActionSave<Role> & ApiActionSuccess>(),
		'Delete Error': props<ApiActionSave<Role> & ApiActionError>(),
		Get: props<ApiActionId<Role>>(),
		'Get Success': props<ApiActionSave<Role> & ApiActionSuccess>(),
		'Get Error': props<ApiActionError>(),
		List: emptyProps(),
		'List Success': props<ApiActionListSuccess<Role>>(),
		'List Error': props<ApiActionError>(),
		Update: props<ApiActionSave<Role>>(),
		'Update Success': props<ApiActionSave<Role> & ApiActionSuccess>(),
		'Update Error': props<ApiActionError>(),
	},
});
