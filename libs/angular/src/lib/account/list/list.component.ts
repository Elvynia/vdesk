import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Account } from '@lv/common';
import { AccountItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-account-list',
	imports: [
		AccountItemComponent,
		MatListModule,
	],
	templateUrl: './list.component.html',
	styleUrl: './list.component.css'
})
export class AccountListComponent {
	@Input() values: Account[];
	@Output() delete: EventEmitter<Account>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Account>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
