import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Mission } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { formParseFloat } from '../../util/form/form-parse-number';
import { MissionFormComponent } from '../form/form.component';
import { missionActions } from '../mission.actions';

@Component({
	selector: 'lv-mission-form-card',
	imports: [
		MissionFormComponent,

		MatButtonModule,
		MatCardModule,

		LoadingDirective,
	],
	templateUrl: './form-card.component.html',
	styleUrl: './form-card.component.scss',
})
export class MissionFormCardComponent implements OnInit, OnChanges {
	@Input() value?: Mission;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Mission>;
	group!: FormGroup;
	pending: boolean;

	constructor(private formBuilder: FormBuilder, private actions: Actions) {
		this.back = new EventEmitter();
		this.save = new EventEmitter();
		this.pending = false;
	}

	ngOnInit(): void {
		if (!this.group) {
			this.reset();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value']) {
			this.reset();
		}
	}

	cancel() {
		this.reset();
		this.back.next();
	}

	getEditValue() {
		const value = this.group.getRawValue();
		if (value._id) {
			return {
				_id: value._id,
				name: value.name,
				rate: formParseFloat(value.rate),
				byDay: value.byDay,
				dayLength: parseInt(value.dayLength),
				start: value.start,
				end: value.end,
				desc: value.desc,
			} as Mission;
		} else {
			return {
				name: value.name,
				rate: parseFloat(value.rate.replace(/[$€]/g, '')),
				byDay: value.byDay,
				dayLength: parseInt(value.dayLength),
				start: value.start,
				end: value.end,
				desc: value.desc,
			} as Mission;
		}
	}

	submit() {
		this.pending = true;
		this.save.next(this.getEditValue());
		this.actions
			.pipe(
				ofType(
					missionActions.createSuccess,
					missionActions.createError,
					missionActions.updateSuccess,
					missionActions.updateError
				),
				first(),
				filter(({ success }) => !!success),
				finalize(() => (this.pending = false))
			)
			.subscribe(() => this.reset());
	}

	private reset() {
		this.group = this.formBuilder.group({
			_id: [
				{
					value: this.value?._id,
					disabled: true,
				},
			],
			name: [this.value?.name, [Validators.required]],
			rate: [this.value?.rate, [Validators.required]],
			byDay: [this.value?.byDay, []],
			dayLength: [this.value?.dayLength, []],
			start: [this.value?.start, []],
			end: [this.value?.end, []],
			desc: [this.value?.desc, []],
		});
	}
}
