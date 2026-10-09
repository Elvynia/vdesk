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
import { Chunk, Mission, missionGroupByCompany } from '@lv/common';
import { distinctUntilChanged, identity } from 'rxjs';
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

	@HostListener('keyup.control.arrowUp', ['decr'])
	@HostListener('keyup.control.arrowDown', ['incr'])
	updateMission(val: number) {
		let missionGroupsFlat = Object.values(this.missionGroups).flatMap(identity);
		let missionId = this.group.controls.mission.value?._id;
		let missionIndex = missionId ? missionGroupsFlat.findIndex((m) => m._id === missionId) + val : 0;
		this.group.controls.mission.setValue(missionGroupsFlat[(missionIndex + missionGroupsFlat.length) % missionGroupsFlat.length]);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.missions && this.missions) {
			this.missionGroups = missionGroupByCompany(this.missions, true);
		} else if (changes.missions) {
			this.missionGroups = {};
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
