import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	MAT_DATE_LOCALE,
	MatNativeDateModule,
	provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Chunk, Mission } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, finalize, first } from 'rxjs';
import { LoadingDirective } from "../../loading/loading.directive";
import { MissionService } from '../../mission/mission.service';
import { formParseInt } from '../../util/form/form-parse-number';
import { DecimalFormatDirective } from "../../util/format/decimal-format.directive";
import { chunkActions } from '../chunk.actions';

@Component({
	selector: 'lv-chunk-form',
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatRadioModule,
		ReactiveFormsModule,
		DecimalFormatDirective,
		DatePipe,
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
		{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
})
export class ChunkFormComponent implements OnChanges {
	@Input() group!: FormGroup;
	@Input() value?: Chunk;
	@Input() missions: Mission[];
	countLabel: string;

	constructor() {
		this.missions = [];
		this.countLabel = 'Hours';
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.group && this.group) {
			this.group.get('mission')!.valueChanges.pipe(
				distinctUntilChanged()
			).subscribe((m) => this.countLabel = m?.byDay ? 'Days' : 'Hours');
		}
	}
}
