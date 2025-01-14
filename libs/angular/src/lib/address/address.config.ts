import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AddressEffects } from './address.effects';
import { addressReducer } from './address.reducer';

export function provideEntityAddress(): Array<Provider | EnvironmentProviders> {
	return [
		provideState('addresses', addressReducer),
		provideEffects([AddressEffects]),
	];
}
