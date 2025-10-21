import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { InvoiceEffects } from './invoice.effects';
import { invoiceReducer } from './invoice.reducer';

export function provideEntityInvoice(): Array<Provider | EnvironmentProviders> {
	return [
		provideState('invoices', invoiceReducer),
		provideEffects([InvoiceEffects]),
	];
}
