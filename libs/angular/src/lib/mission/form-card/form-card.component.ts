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
import { Company, CompanyState, Mission, selectCompanies } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, finalize, first, takeUntil } from 'rxjs';
import { companyActions } from '../../company/company.actions';
import { LoadingDirective } from '../../loading/loading.directive';
import { formParseFloat } from '../../util/form/form-parse-number';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';
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
})
export class MissionFormCardComponent extends ObserverCompomix() implements OnInit, OnChanges {
	@Input() value?: Mission;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Mission>;
	companyList: Company[];
	group!: FormGroup;
	pending: boolean;

	constructor(
		private formBuilder: FormBuilder,
		private store: Store<CompanyState>,
		private actions: Actions
	) {
		super();
		this.back = new EventEmitter();
		this.save = new EventEmitter();
		this.companyList = [];
		this.pending = true;
	}

	ngOnInit(): void {
		this.store
			.select(selectCompanies)
			.pipe(
				takeUntil(this.destroy$)
			).subscribe((companyList) => {
				this.companyList = Object.values(companyList);
				if (!this.group) {
					this.reset();
				}
			});
		this.actions.pipe(
			ofType(companyActions.listSuccess, companyActions.listError),
			first(),
			finalize(() => this.pending = false)
		).subscribe();
		this.store.dispatch(companyActions.list());
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

	private findCompany(companyId: string | undefined): any {
		if (companyId) {
			return this.companyList.find((c) => c._id === companyId);
		}
		return undefined;
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
				companyId: value.company._id
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
				companyId: value.company._id
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
			company: [this.findCompany(this.value?.companyId), [Validators.required]],
		});
	}
}
