import { Account } from "@lv/common";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ApiActionError, ApiActionId, ApiActionListSuccess, ApiActionSave, ApiActionSuccess } from "../util/api.action";

export const accountActions = createActionGroup({
	source: 'Account',
	events: {
		'Create': props<ApiActionSave<Account>>(),
		'Create Success': props<ApiActionSave<Account> & ApiActionSuccess>(),
		'Create Error': props<ApiActionSave<Account>>(),
		'Delete': props<ApiActionSave<Account>>(),
		'Delete Success': props<ApiActionSave<Account> & ApiActionSuccess>(),
		'Delete Error': props<ApiActionSave<Account> & ApiActionError>(),
		'Get': props<ApiActionId<Account>>(),
		'Get Success': props<ApiActionSave<Account> & ApiActionSuccess>(),
		'Get Error': props<ApiActionError>(),
		'List': emptyProps(),
		'List Success': props<ApiActionListSuccess<Account>>(),
		'List Error': props<ApiActionError>(),
		'Update': props<ApiActionSave<Account>>(),
		'Update Success': props<ApiActionSave<Account> & ApiActionSuccess>(),
		'Update Error': props<ApiActionError>(),
	}
});
