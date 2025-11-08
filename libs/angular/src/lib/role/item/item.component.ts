
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Role } from '@lv/common';
import { LoadingPlaceholderComponent } from '../../loading/placeholder/loading-placeholder.component';
import { HoverableCompomix } from '../../util/mixins/hoverable.compomix';

@Component({
	selector: 'lv-role-item',
	imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    LoadingPlaceholderComponent
],
	templateUrl: './item.component.html',
	styleUrl: './item.component.scss',
})
export class RoleItemComponent extends HoverableCompomix() {
	@Input() value!: Role;
	@Output() delete: EventEmitter<Role>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Role>;

	constructor() {
		super();
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
