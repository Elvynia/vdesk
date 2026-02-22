import { Component, OnInit } from '@angular/core';
import {
	invoiceActions,
	InvoiceFormCardComponent,
	InvoiceListComponent,
	InvoiceService,
	isApiActionSuccess,
	observeDownload,
	ObserverCompomix
} from '@lv/angular';
import { Invoice, InvoiceSave, isInvoiceUpdate, selectInvoices } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, first, takeUntil } from 'rxjs';

@Component({
	selector: 'lv-invoice-view',
	imports: [InvoiceListComponent, InvoiceFormCardComponent],
	templateUrl: './view.component.html',
	host: {
		class: 'flex flex-col lg:flex-row space-between gap-8 h-full w-full'
	}
})
export class InvoiceViewComponent extends ObserverCompomix() implements OnInit {
	invoices: Invoice[];
	editInvoice?: Invoice;

	constructor(private store: Store<any>, private actions: Actions,
		private invoiceService: InvoiceService
	) {
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

	detail(id: string) {
		this.invoiceService.preview(id).subscribe((res) => {
			if (res.body) {
				var pdfUrl = window.URL.createObjectURL(new Blob(["\ufeff", res.body], { type: 'text/html' }));
				window.open(pdfUrl, '_blank')?.focus();
			}
		});
	}

	download(id: string) {
		this.invoiceService.download(id).subscribe(observeDownload());
	}

	edit(invoice: InvoiceSave) {
		this.editInvoice = invoice as Invoice;
	}

	save(value: InvoiceSave) {
		let action;
		if (isInvoiceUpdate(value)) {
			action = invoiceActions.update({ value });
		} else {
			action = invoiceActions.create({ value });
		}
		this.store.dispatch(action);
		this.actions
			.pipe(
				ofType(
					invoiceActions.createSuccess,
					invoiceActions.createError,
					invoiceActions.updateSuccess,
					invoiceActions.updateError
				),
				first(),
				filter((action) => isApiActionSuccess(action))
			).subscribe(() => {
				this.cancel();
			});
	}
}
