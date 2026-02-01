import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
	MAT_DATE_LOCALE,
	MatNativeDateModule,
	provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Invoice } from '@lv/common';
import { CurrencyFormatDirective } from '../../util/format/currency-format.directive';
import { DecimalFormatDirective } from "../../util/format/decimal-format.directive";
import { ObserverCompomix } from '../../util/mixins/observer.compomix';

@Component({
	selector: 'lv-invoice-form',
	imports: [
		MatButtonModule,
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
})
export class InvoiceFormComponent extends ObserverCompomix() {
	@Input() group!: FormGroup;
	@Input() value?: Invoice;
	@Output() addLine: EventEmitter<void>;
	@Output() removeLine: EventEmitter<number>;

	get lineArray() {
		return this.group.controls.lines as FormArray<FormGroup>;
	}

	constructor() {
		super();
		this.addLine = new EventEmitter();
		this.removeLine = new EventEmitter();
	}

	compareId(e1: any, e2: any) {
		return e1?._id === e2?._id;
	}
}
