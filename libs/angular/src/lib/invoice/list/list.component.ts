import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Invoice } from '@lv/common';
import { InvoiceItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-invoice-list',
	imports: [InvoiceItemComponent, MatListModule],
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss',
})
export class InvoiceListComponent {
	@Input() values: Invoice[];
	@Output() delete: EventEmitter<Invoice>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Invoice>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
