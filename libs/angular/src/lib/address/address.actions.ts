import { Address } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    ApiActionError,
    ApiActionId,
    ApiActionListSuccess,
    ApiActionSave,
    ApiActionSuccess,
} from '../util/api.action';

export const addressActions = createActionGroup({
	source: 'Address',
	events: {
		Create: props<ApiActionSave<Address>>(),
		'Create Success': props<ApiActionSave<Address> & ApiActionSuccess>(),
		'Create Error': props<ApiActionSave<Address>>(),
		Delete: props<ApiActionSave<Address>>(),
		'Delete Success': props<ApiActionSave<Address> & ApiActionSuccess>(),
		'Delete Error': props<ApiActionSave<Address> & ApiActionError>(),
		Get: props<ApiActionId<Address>>(),
		'Get Success': props<ApiActionSave<Address> & ApiActionSuccess>(),
		'Get Error': props<ApiActionError>(),
		List: emptyProps(),
		'List Success': props<ApiActionListSuccess<Address>>(),
		'List Error': props<ApiActionError>(),
		Update: props<ApiActionSave<Address>>(),
		'Update Success': props<ApiActionSave<Address> & ApiActionSuccess>(),
		'Update Error': props<ApiActionError>(),
	},
});
