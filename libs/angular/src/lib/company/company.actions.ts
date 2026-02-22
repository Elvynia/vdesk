import { Company } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiActionError, ApiActionId, ApiActionListSuccess, ApiActionSave, ApiActionSuccess, } from '../util/api.action';

export const companyActions = createActionGroup({
	source: 'Company',
	events: {
		'Create': props<ApiActionSave<Company>>(),
		'Create Success': props<ApiActionSave<Company> & ApiActionSuccess>(),
		'Create Error': props<ApiActionSave<Company> & ApiActionError>(),
		'Delete': props<ApiActionSave<Company>>(),
		'Delete Success': props<ApiActionSave<Company> & ApiActionSuccess>(),
		'Delete Error': props<ApiActionSave<Company> & ApiActionError>(),
		'Get': props<ApiActionId>(),
		'Get Success': props<ApiActionSave<Company> & ApiActionSuccess>(),
		'Get Error': props<ApiActionError>(),
		'List': emptyProps(),
		'List Success': props<ApiActionListSuccess<Company>>(),
		'List Error': props<ApiActionError>(),
		'Update': props<ApiActionSave<Company>>(),
		'Update Success': props<ApiActionSave<Company> & ApiActionSuccess>(),
		'Update Error': props<ApiActionSave<Company> & ApiActionError>(),
	},
});
