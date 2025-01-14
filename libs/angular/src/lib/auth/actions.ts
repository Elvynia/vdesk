import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthEntity, ChangePasswordRequest, LoginRequest } from './type';
import { ApiActionError } from '../util/api.action';

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login': props<{ request: LoginRequest }>(),
        'Login Success': props<{ auth: AuthEntity }>(),
        'Login Error': props<ApiActionError>(),
        'Logout': emptyProps(),
        'Refresh success': props<{ auth: AuthEntity }>(),
        'Refresh error': emptyProps(),
        'Password expired': props<{ username: string }>(),
        'Change expired password': props<{ request: ChangePasswordRequest }>(),
        'Change expired password success': emptyProps(),
        'Change expired password error': emptyProps()
    }
});
