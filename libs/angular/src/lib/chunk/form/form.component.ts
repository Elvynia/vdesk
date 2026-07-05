import { DatePipe, KeyValuePipe, NgClass } from '@angular/common';
import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
	MatNativeDateModule
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
		NgClass,
		KeyValuePipe,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatRadioModule,
		ReactiveFormsModule,
		DecimalFormatDirective,
		DatePipe,
		NgClass
	],
	templateUrl: './form.component.html',
	host: {
		class: /*tw*/ 'flex flex-col h-full'
	},
})
export class ChunkFormComponent implements OnChanges {
	@Input() group!: FormGroup;
	@Input() value?: Partial<Chunk>;
	@Input() missions: Mission[];
	missionGroups: Record<string, Mission[]>;
	countLabel: string;
	decr: number = -1;
	incr: number = 1;

	constructor() {
		this.missions = [];
		this.missionGroups = {};
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
		if (changes.missions) {
			this.missionGroups = this.missions?.reduce((g, m) => {
				if (!g[m.company!.name]) {
					g[m.company!.name] = [];
				}
				g[m.company!.name].push(m);
				return g;
			}, {} as Record<string, Mission[]>) || {};
		}
		if (changes.group && this.group) {
			this.group.get('mission')!.valueChanges.pipe(
				distinctUntilChanged()
			).subscribe((m) => this.countLabel = m?.byDay ? 'Days' : 'Hours');
		}
	}

	clearDesc(event: PointerEvent) {
		event.stopPropagation();
		this.group.controls.desc.reset();
	}
}
