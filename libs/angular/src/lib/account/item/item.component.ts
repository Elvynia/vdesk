import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Account } from '@lv/common';
import { LoadingPlaceholderComponent } from '../../loading/placeholder/loading-placeholder.component';
import { HoverableCompomix } from '../../util/mixins/hoverable.compomix';

@Component({
	selector: 'lv-account-item',
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		LoadingPlaceholderComponent
	],
	templateUrl: './item.component.html',
	styleUrl: './item.component.scss',
})
export class AccountItemComponent extends HoverableCompomix() {
	@Input() value!: Account;
	@Output() delete: EventEmitter<Account>;
	@Output() edit: EventEmitter<Account>;

	constructor() {
		super();
		this.delete = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
