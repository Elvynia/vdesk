import { DatePipe } from '@angular/common';
import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { distinctUntilChanged } from 'rxjs';
import { DecimalFormatDirective } from "../../util/format/decimal-format.directive";

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
})
export class ChunkFormComponent implements OnChanges {
	@Input() group!: FormGroup;
	@Input() value?: Chunk;
	@Input() missions: Mission[];
	countLabel: string;
	decr: number = -1;
	incr: number = 1;

	constructor() {
		this.missions = [];
		this.countLabel = 'Hours';
	}

	@HostListener('keyup.control.arrowLeft', ['decr'])
	@HostListener('keyup.control.arrowRight', ['incr'])
	updateDate(val: number) {
		const date = this.group.controls.date as FormControl<Date>;
		const newDateValue = new Date(date.value)
		newDateValue.setDate(date.value.getDate() + val);
		date.setValue(newDateValue);
	}

	@HostListener('keyup.control.1', ['missions[0]'])
	@HostListener('keyup.control.2', ['missions[1]'])
	@HostListener('keyup.control.3', ['missions[2]'])
	@HostListener('keyup.control.4', ['missions[3]'])
	updateMission(mission: Mission) {
		if (mission) {
			this.group.controls.mission.setValue(mission);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.group && this.group) {
			this.group.get('mission')!.valueChanges.pipe(
				distinctUntilChanged()
			).subscribe((m) => this.countLabel = m?.byDay ? 'Days' : 'Hours');
		}
	}
}
