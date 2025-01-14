import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Address } from '@lv/common';
import { LoadingPlaceholderComponent } from '../../loading/placeholder/loading-placeholder.component';
import { HoverableCompomix } from '../../util/mixins/hoverable.compomix';

@Component({
	selector: 'lv-address-item',
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		LoadingPlaceholderComponent,
	],
	templateUrl: './item.component.html',
	styleUrl: './item.component.scss',
})
export class AddressItemComponent extends HoverableCompomix() {
	@Input() value!: Address;
	@Output() delete: EventEmitter<Address>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Address>;

	constructor() {
		super();
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
