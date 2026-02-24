import { Component, Input } from '@angular/core';
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Invoice, sortInvoices } from '@lv/common';
import { Store } from '@ngrx/store';
import { invoiceActions } from '../invoice.actions';

@Component({
	selector: 'lv-invoice-tracker',
	imports: [
		MatCardModule,
		MatListModule,
		MatSlideToggleModule,
		ɵInternalFormsSharedModule
	],
	templateUrl: './tracker.component.html',
	host: {
		class: /*tw*/ ''
	},
})
export class InvoiceTrackerComponent {
	@Input({
		transform: (values: Invoice[]) => values.sort(sortInvoices)
	}) values: Invoice[];

	constructor(
		private store: Store
	) {
		this.values = [];
	}

	private update(value: Pick<Invoice, '_id' | 'sent'> | Pick<Invoice, '_id' | 'paid'>) {
		this.store.dispatch(invoiceActions.patch({ value }));
	}

	updatePaid(event: MatSlideToggleChange, { _id }: Invoice) {
		this.update({
			_id,
			paid: event.checked
		});
	}

	updateSent(event: MatSlideToggleChange, { _id }: Invoice) {
		this.update({
			_id,
			sent: event.checked
		});
	}
}
