
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CompanyRead } from '@lv/common';
import { LoadingPlaceholderComponent } from '../../loading/placeholder/loading-placeholder.component';
import { HoverableCompomix } from '../../util/mixins/hoverable.compomix';

@Component({
	selector: 'lv-company-item',
	imports: [
		MatButtonModule,
		MatIconModule,
		MatListModule,
		LoadingPlaceholderComponent
	],
	templateUrl: './item.component.html'
})
export class CompanyItemComponent extends HoverableCompomix() {
	@Input() value!: CompanyRead;
	@Output() delete: EventEmitter<CompanyRead>;
	@Output() detail: EventEmitter<CompanyRead>;
	@Output() edit: EventEmitter<CompanyRead>;

	constructor() {
		super();
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
