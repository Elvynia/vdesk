import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Chunk, Mission } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { isApiActionSuccess } from '../../util/api.action';
import { formParseFromDate, formParseToDate } from '../../util/form/form-parse-date';
import { formParseInt } from '../../util/form/form-parse-number';
import { chunkActions } from '../chunk.actions';
import { ChunkFormComponent } from '../form/form.component';

@Component({
	selector: 'lv-chunk-form-card',
	imports: [
		ChunkFormComponent,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		LoadingDirective,
	],
	templateUrl: './form-card.component.html',
	host: {
		class: /*tw*/ 'flex flex-col'
	}
})
export class ChunkFormCardComponent implements OnInit, OnChanges {
	@Input() missions: Mission[];
	@Input() value?: Partial<Chunk>;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Chunk>;
	group!: FormGroup;
	pending: boolean;

	constructor(
		private formBuilder: FormBuilder,
		private store: Store<any>,
		private actions: Actions
	) {
		this.back = new EventEmitter();
		this.save = new EventEmitter();
		this.missions = [];
		this.pending = false;
	}

	private findMission(missionId: string | undefined): any {
		if (missionId) {
			return this.missions.find((m) => m._id === missionId);
		}
		return undefined;
	}

	ngOnInit(): void {
		if (!this.group) {
			this.reset();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.value || changes.missions) {
			this.reset();
		}
	}

	cancel() {
		this.group?.reset({});
		this.reset();
		this.back.next();
	}


	getSubmitValue() {
		const value = this.group.getRawValue() as Chunk;
		return {
			...value,
			count: formParseInt(value.count)!,
			date: formParseFromDate(value.date as Date).toISOString(),
			mission: undefined,
			missionId: value.mission!._id,
		}
	}

	submit(keepAll?: boolean) {
		if (this.group.invalid || this.group.pending || this.pending) {
			return;
		}
		const value = this.getSubmitValue();
		if (!keepAll) {
			this.group.reset({});
		}
		this.pending = true;
		this.store.next(chunkActions.create({ value }));
		this.actions
			.pipe(
				ofType(
					chunkActions.createSuccess,
					chunkActions.createError,
					chunkActions.updateSuccess,
					chunkActions.updateError
				),
				first(),
				filter(isApiActionSuccess<Chunk>),
				filter((action) => isApiActionSuccess(action)),
				finalize(() => (this.pending = false))
			)
			.subscribe(() => this.reset());
	}

	@HostListener('keyup.control.enter')
	submitKey() {
		this.submit(true);
	}

	private reset() {
		let draft = this.group?.getRawValue() || {} as Partial<Chunk>;
		let value = {
			_id: this.value?._id,
			count: this.value?.count || draft.count,
			date: (this.value?.date ? formParseToDate(this.value.date) : undefined) || draft.date || new Date(),
			desc: this.value?.desc || draft.desc,
			mission: this.findMission(this.value?.missionId) || draft.mission,
		};
		this.group = this.formBuilder.group({
			_id: [
				{
					value: value._id,
					disabled: true,
				},
			],
			count: [value.count, [Validators.required]],
			date: [value.date, [Validators.required]],
			desc: [value.desc],
			mission: [value.mission, [Validators.required]],
		});
	}
}
