
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Invoice } from '@lv/common';
import { LoadingPlaceholderComponent } from '../../loading/placeholder/loading-placeholder.component';
import { HoverableCompomix } from '../../util/mixins/hoverable.compomix';

@Component({
	selector: 'lv-invoice-item',
	imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    LoadingPlaceholderComponent
],
	templateUrl: './item.component.html',
	styleUrl: './item.component.scss',
})
export class InvoiceItemComponent extends HoverableCompomix() {
	@Input() value!: Invoice;
	@Output() delete: EventEmitter<Invoice>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Invoice>;

	constructor() {
		super();
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
