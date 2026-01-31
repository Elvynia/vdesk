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
import { Chunk, Mission } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { ApiActionSave } from '../../util/api.action';
import { formParseFromDate } from '../../util/form/form-parse-date';
import { formParseInt } from '../../util/form/form-parse-number';
import { chunkActions } from '../chunk.actions';
import { ChunkFormComponent } from '../form/form.component';

@Component({
	selector: 'lv-chunk-form-card',
	imports: [
		ChunkFormComponent,
		MatButtonModule,
		MatCardModule,
		LoadingDirective,
	],
	templateUrl: './form-card.component.html',
	styleUrl: './form-card.component.css',
})
export class ChunkFormCardComponent implements OnInit, OnChanges {
	@Input() missions: Mission[];
	@Input() value?: Chunk;
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
		this.reset();
		this.back.next();
	}


	getEditValue() {
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
		this.pending = true;
		this.store.next(chunkActions.create({ value: this.getEditValue() }));
		this.actions
			.pipe(
				ofType(
					chunkActions.createSuccess,
					chunkActions.createError,
					chunkActions.updateSuccess,
					chunkActions.updateError
				),
				first(),
				// filter(isApiActionSuccess),
				finalize(() => (this.pending = false))
			)
			.subscribe((a) => this.reset({
				missionId: (a as ApiActionSave<Chunk>).value.missionId,
				desc: keepAll ? (a as ApiActionSave<Chunk>).value.desc : undefined,
				date: keepAll ? new Date((a as ApiActionSave<Chunk>).value.date) : undefined
			}));
	}

	@HostListener('keyup.control.enter')
	submitKey() {
		this.submit(true);
	}

	private reset(value?: Partial<Chunk>) {
		value = value || this.value;
		this.group = this.formBuilder.group({
			_id: [
				{
					value: value?._id,
					disabled: true,
				},
			],
			count: [value?.count, [Validators.required]],
			date: [value?.date || new Date(), [Validators.required]],
			desc: [value?.desc],
			mission: [this.findMission(value?.missionId), [Validators.required]],
		});
	}
}
