import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Chunk, ChunkState } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';

import { DigitsFormatDirective } from '../../util/format/digits-format.directive';

import {
	MAT_DATE_LOCALE,
	MatNativeDateModule,
	provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
	selector: 'lv-chunk-form',
	imports: [
		MatFormFieldModule,
		MatInputModule,

		MatDatepickerModule,
		MatNativeDateModule,

		ReactiveFormsModule,

		DigitsFormatDirective,
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
	],

	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
})
export class ChunkFormComponent extends ObserverCompomix() {
	@Input() group!: FormGroup;
	@Input() value?: Chunk;

	constructor() {
		super();
	}
}
