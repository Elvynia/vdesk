import { Component, OnInit } from '@angular/core';
import {
	invoiceActions,
	InvoiceFormCardComponent,
	InvoiceListComponent,
	ApiAction,
	ObserverCompomix,
} from '@lv/angular';
import { Invoice, selectInvoices } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { filter, first, takeUntil } from 'rxjs';

@Component({
	selector: 'lv-invoice-view',
	imports: [InvoiceListComponent, InvoiceFormCardComponent],
	templateUrl: './view.component.html',
	styleUrl: './view.component.scss',
})
export class InvoiceViewComponent extends ObserverCompomix() implements OnInit {
	invoices: Invoice[];
	editInvoice?: Invoice;

	constructor(private store: Store<any>, private actions: Actions) {
		super();
		this.invoices = [];
	}

	ngOnInit() {
		this.store
			.select(selectInvoices)
			.pipe(
				filter((s) => !!s),
				takeUntil(this.destroy$)
			)
			.subscribe((invoices) => (this.invoices = Object.values(invoices)));
		this.store.dispatch(invoiceActions.list());
	}

	cancel() {
		this.editInvoice = undefined;
	}

	delete(value: Invoice) {
		if (this.editInvoice?._id === value._id) {
			this.editInvoice = undefined;
		}
		this.store.dispatch(invoiceActions.delete({ value }));
	}

	edit(invoice: Invoice) {
		this.editInvoice = invoice;
	}

	save(value: Invoice) {
		let action;
		if (value._id) {
			action = invoiceActions.update({ value });
		} else {
			action = invoiceActions.create({ value });
		}
		this.store.dispatch(action);
		this.actions
			.pipe(
				ofType<ApiAction<Invoice> & Action>(
					invoiceActions.createSuccess,
					invoiceActions.createError,
					invoiceActions.updateSuccess,
					invoiceActions.updateError
				),
				first()
			)
			.subscribe((action) => {
				if (action.success) {
					this.cancel();
				}
			});
	}
}
