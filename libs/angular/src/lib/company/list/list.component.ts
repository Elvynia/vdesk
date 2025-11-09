import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Company } from '@lv/common';
import { CompanyItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-company-list',
	imports: [CompanyItemComponent, MatListModule],
	templateUrl: './list.component.html',
	styleUrl: './list.component.css',
})
export class CompanyListComponent {
	@Input() values: Company[];
	@Output() delete: EventEmitter<Company>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Company>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
