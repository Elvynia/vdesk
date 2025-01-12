import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { RoleEffects } from './role.effects';
import { roleReducer } from './role.reducer';

export function provideEntityRole(): Array<Provider | EnvironmentProviders> {
	return [provideState('roles', roleReducer), provideEffects([RoleEffects])];
}
