import { Invoice } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiActionError, ApiActionListSuccess } from '../../util/api.action';

export const invoicePendingActions = createActionGroup({
	source: 'Invoice Pending',
	events: {
		'ListenPending': emptyProps(),
		'ListenPending Message': props<ApiActionListSuccess<Invoice | null>>(),
		'ListenPending Error': props<ApiActionError>(),
	},
});
