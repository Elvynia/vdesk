import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Role } from '@lv/common';
import { RoleItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-role-list',
	imports: [RoleItemComponent, MatListModule],
	templateUrl: './list.component.html',
})
export class RoleListComponent {
	@Input() values: Role[];
	@Output() delete: EventEmitter<Role>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Role>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
