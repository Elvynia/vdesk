import { Invoice } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
	ApiActionError,
	ApiActionId,
	ApiActionListSuccess,
	ApiActionSave,
	ApiActionSuccess,
} from '../util/api.action';

export const invoiceActions = createActionGroup({
	source: 'Invoice',
	events: {
		Create: props<ApiActionSave<Invoice>>(),
		'Create Success': props<ApiActionSave<Invoice> & ApiActionSuccess>(),
		'Create Error': props<ApiActionSave<Invoice>>(),
		Delete: props<ApiActionSave<Invoice>>(),
		'Delete Success': props<ApiActionSave<Invoice> & ApiActionSuccess>(),
		'Delete Error': props<ApiActionSave<Invoice> & ApiActionError>(),
		Get: props<ApiActionId<Invoice>>(),
		'Get Success': props<ApiActionSave<Invoice> & ApiActionSuccess>(),
		'Get Error': props<ApiActionError>(),
		List: emptyProps(),
		'List Success': props<ApiActionListSuccess<Invoice>>(),
		'List Error': props<ApiActionError>(),
		Update: props<ApiActionSave<Invoice>>(),
		'Update Success': props<ApiActionSave<Invoice> & ApiActionSuccess>(),
		'Update Error': props<ApiActionError>(),
	},
});
