import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Address } from '@lv/common';
import { AddressItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-address-list',
	imports: [AddressItemComponent, MatListModule],
	templateUrl: './list.component.html',
	styleUrl: './list.component.css',
})
export class AddressListComponent {
	@Input() values: Address[];
	@Output() delete: EventEmitter<Address>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Address>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
