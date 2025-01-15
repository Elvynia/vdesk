import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CompanyTypeEffects } from './company-type.effects';
import { companyTypeReducer } from './company-type.reducer';

export function provideEntityCompanyType(): Array<
	Provider | EnvironmentProviders
> {
	return [
		provideState('companyTypes', companyTypeReducer),
		provideEffects([CompanyTypeEffects]),
	];
}
