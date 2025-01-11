import { EnvironmentProviders, Provider } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { AccountEffects } from "./account.effects";
import { accountReducer } from "./account.reducer";

export function provideEntityAccount(): Array<Provider | EnvironmentProviders> {
	return [
		provideState('accounts', accountReducer),
		provideEffects([AccountEffects])
	];
}
