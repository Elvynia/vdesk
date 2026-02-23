import { EnvironmentProviders, Provider } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { invoiceEffectListenActive } from "./invoice-pending.effect";
import { invoicePendingReducer } from "./invoice-pending.reducer";

export function provideEntityInvoicePending(): Array<Provider | EnvironmentProviders> {
	return [
		provideState('invoicesPending', invoicePendingReducer),
		provideEffects({
			invoiceEffectListenActive
		}),
	];
}
