import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CompanyType } from '@lv/common';
import { CompanyTypeItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-company-type-list',
	imports: [CompanyTypeItemComponent, MatListModule],
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss',
})
export class CompanyTypeListComponent {
	@Input() values: CompanyType[];
	@Output() delete: EventEmitter<CompanyType>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<CompanyType>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
