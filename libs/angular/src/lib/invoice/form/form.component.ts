import { CurrencyPipe } from '@angular/common';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Invoice, Mission } from '@lv/common';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { CurrencyFormatDirective } from '../../util/format/currency-format.directive';


import {
	MAT_DATE_LOCALE,
	MatNativeDateModule,
	provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DecimalFormatDirective } from "../../util/format/decimal-format.directive";

@Component({
	selector: 'lv-invoice-form',
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatIconModule,
		MatNativeDateModule,

		ReactiveFormsModule,
		CurrencyFormatDirective,
		DecimalFormatDirective
	],
	providers: [
		provideNativeDateAdapter({
			parse: {
				dateInput: 'DD/MM/YYYY',
			},
			display: {
				dateInput: 'DD/MM/YYYY',
				monthYearLabel: 'MMMM YYYY',
				dateA11yLabel: 'LL',
				monthYearA11yLabel: 'MMMM YYYY',
			},
		}),
		{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },

		CurrencyPipe,
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
})
export class InvoiceFormComponent extends ObserverCompomix() {
	@Input() group!: FormGroup;
	@Input() value?: Invoice;
	// @Input() missionList: Mission[];
	@Output() addLine: EventEmitter<void>;
	@Output() removeLine: EventEmitter<number>;

	get lineArray() {
		return this.group.controls.lines as FormArray<FormGroup>;
	}

	constructor() {
		super();
		this.addLine = new EventEmitter();
		this.removeLine = new EventEmitter();
		// this.missionList = [];
	}

	compareId(e1: any, e2: any) {
		return e1?._id === e2?._id;
	}
}
