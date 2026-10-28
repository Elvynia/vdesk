import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CompanyRead } from '@lv/common';
import { CompanyItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-company-list',
	imports: [CompanyItemComponent, MatListModule],
	templateUrl: './list.component.html',
})
export class CompanyListComponent {
	@Input() values: CompanyRead[];
	@Output() delete: EventEmitter<CompanyRead>;
	@Output() detail: EventEmitter<CompanyRead>;
	@Output() edit: EventEmitter<CompanyRead>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
