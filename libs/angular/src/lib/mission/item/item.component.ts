
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Mission } from '@lv/common';
import { LoadingPlaceholderComponent } from '../../loading/placeholder/loading-placeholder.component';
import { HoverableCompomix } from '../../util/mixins/hoverable.compomix';

@Component({
	selector: 'lv-mission-item',
	imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    LoadingPlaceholderComponent
],
	templateUrl: './item.component.html',
	host: {
		class: /*tw*/ 'relative'
	}
})
export class MissionItemComponent extends HoverableCompomix() {
	@Input() value!: Mission;
	@Output() delete: EventEmitter<Mission>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Mission>;

	constructor() {
		super();
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
