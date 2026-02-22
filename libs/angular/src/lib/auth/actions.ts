import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiActionError, ApiActionSave, ApiActionSuccess } from '../util/api.action';
import { AuthState, ChangePasswordRequest, LoginRequest } from './type';

export const authActions = createActionGroup({
	source: 'Auth',
	events: {
		'Login': props<{ request: LoginRequest }>(),
		'Login Success': props<ApiActionSave<AuthState> & ApiActionSuccess>(),
		'Login Error': props<ApiActionError>(),
		'Logout': emptyProps(),
		'Refresh success': props<ApiActionSave<AuthState> & ApiActionSuccess>(),
		'Refresh error': props<ApiActionError>(),
		'Password expired': props<{ username: string }>(),
		'Change expired password': props<{ request: ChangePasswordRequest }>(),
		'Change expired password success': props<ApiActionSuccess>(),
		'Change expired password error': props<ApiActionError>()
	}
});
