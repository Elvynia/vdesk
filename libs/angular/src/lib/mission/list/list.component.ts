import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Mission } from '@lv/common';
import { MissionItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-mission-list',
	imports: [MissionItemComponent, MatListModule],
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss',
})
export class MissionListComponent {
	@Input() values: Mission[];
	@Output() delete: EventEmitter<Mission>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Mission>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
