import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CompanyEffects } from './company.effects';
import { companyReducer } from './company.reducer';

export function provideEntityCompany(): Array<Provider | EnvironmentProviders> {
	return [
		provideState('companies', companyReducer),
		provideEffects([CompanyEffects]),
	];
}
