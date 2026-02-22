import { Invoice, InvoiceCreate, InvoiceUpdate } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiActionError, ApiActionId, ApiActionListSuccess, ApiActionSave, ApiActionSuccess, } from '../util/api.action';

export const invoiceActions = createActionGroup({
	source: 'Invoice',
	events: {
		'Create': props<ApiActionSave<InvoiceCreate>>(),
		'Create Success': props<ApiActionSave<Invoice> & ApiActionSuccess>(),
		'Create Error': props<ApiActionSave<Invoice> & ApiActionError>(),
		'Delete': props<ApiActionSave<Invoice>>(),
		'Delete Success': props<ApiActionSave<Invoice> & ApiActionSuccess>(),
		'Delete Error': props<ApiActionSave<Invoice> & ApiActionError>(),
		'Get': props<ApiActionId>(),
		'Get Success': props<ApiActionSave<Invoice> & ApiActionSuccess>(),
		'Get Error': props<ApiActionError>(),
		'List': emptyProps(),
		'List Success': props<ApiActionListSuccess<Invoice>>(),
		'List Error': props<ApiActionError>(),
		'Update': props<ApiActionSave<InvoiceUpdate>>(),
		'Update Success': props<ApiActionSave<Invoice> & ApiActionSuccess>(),
		'Update Error': props<ApiActionSave<Invoice> & ApiActionError>(),
	},
});
