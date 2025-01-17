import { CompanyType } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    ApiActionError,
    ApiActionId,
    ApiActionListSuccess,
    ApiActionSave,
    ApiActionSuccess,
} from '../util/api.action';

export const companyTypeActions = createActionGroup({
	source: 'CompanyType',
	events: {
		Create: props<ApiActionSave<CompanyType>>(),
		'Create Success': props<
			ApiActionSave<CompanyType> & ApiActionSuccess
		>(),
		'Create Error': props<ApiActionSave<CompanyType>>(),
		Delete: props<ApiActionSave<CompanyType>>(),
		'Delete Success': props<
			ApiActionSave<CompanyType> & ApiActionSuccess
		>(),
		'Delete Error': props<ApiActionSave<CompanyType> & ApiActionError>(),
		Get: props<ApiActionId<CompanyType>>(),
		'Get Success': props<ApiActionSave<CompanyType> & ApiActionSuccess>(),
		'Get Error': props<ApiActionError>(),
		List: emptyProps(),
		'List Success': props<ApiActionListSuccess<CompanyType>>(),
		'List Error': props<ApiActionError>(),
		Update: props<ApiActionSave<CompanyType>>(),
		'Update Success': props<
			ApiActionSave<CompanyType> & ApiActionSuccess
		>(),
		'Update Error': props<ApiActionError>(),
	},
});
