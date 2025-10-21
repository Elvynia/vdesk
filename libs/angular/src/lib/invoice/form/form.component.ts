import { CurrencyPipe } from '@angular/common';

import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Invoice } from '@lv/common';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { CurrencyFormatDirective } from '../../util/format/currency-format.directive';


import {
	MAT_DATE_LOCALE,
	MatNativeDateModule,
	provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
	selector: 'lv-invoice-form',
	imports: [
		MatFormFieldModule,
		MatInputModule,

		MatCheckboxModule,

		MatDatepickerModule,
		MatNativeDateModule,

		ReactiveFormsModule,

		CurrencyFormatDirective,
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

	constructor() {
		super();
	}
}
