import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Company } from '@lv/common';
import { LoadingPlaceholderComponent } from '../../loading/placeholder/loading-placeholder.component';
import { HoverableCompomix } from '../../util/mixins/hoverable.compomix';

@Component({
	selector: 'lv-company-item',
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		LoadingPlaceholderComponent,
	],
	templateUrl: './item.component.html',
	styleUrl: './item.component.scss',
})
export class CompanyItemComponent extends HoverableCompomix() {
	@Input() value!: Company;
	@Output() delete: EventEmitter<Company>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Company>;

	constructor() {
		super();
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
