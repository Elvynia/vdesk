import { KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Mission, missionGroupByCompany } from '@lv/common';
import { MissionItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-mission-list',
	imports: [
		KeyValuePipe,
		MissionItemComponent,
		MatListModule,
	],
	templateUrl: './list.component.html',
})
export class MissionListComponent implements OnChanges {
	@Input() values: Mission[];
	@Output() delete: EventEmitter<Mission>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Mission>;
	groups: Record<string, Mission[]>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
		this.groups = {};
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.values) {
			if (this.values) {
				this.groups = missionGroupByCompany(this.values);
			} else {
				this.groups = {};
			}
		}
	}
}
