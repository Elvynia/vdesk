import { Mission } from '@lv/common';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiActionError, ApiActionListSuccess } from '../../util/api.action';

export const missionActiveActions = createActionGroup({
	source: 'Mission Active',
	events: {
		'ListenActive': emptyProps(),
		'ListenActive Message': props<ApiActionListSuccess<Mission | null>>(),
		'ListenActive Error': props<ApiActionError>(),
	},
});
