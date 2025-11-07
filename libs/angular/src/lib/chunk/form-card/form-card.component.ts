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
import { Chunk, Mission } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { MissionService } from '../../mission/mission.service';
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
	styleUrl: './form-card.component.scss',
})
export class ChunkFormCardComponent implements OnInit, OnChanges {
	@Input() value?: Chunk;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Chunk>;
	group!: FormGroup;
	missions: Mission[];
	pending: boolean;

	constructor(
		private missionService: MissionService,
		private formBuilder: FormBuilder,
		private store: Store<any>,
		private actions: Actions
	) {
		this.back = new EventEmitter();
		this.save = new EventEmitter();
		this.missions = [];
		this.pending = true;
	}

	ngOnInit() {
		this.missionService.sendListActive().pipe(
			finalize(() => this.pending = false)
		).subscribe((missions) => {
			this.missions = missions;
			if (!this.group) {
				this.reset();
			}
		});
	}

	private findMission(missionId: string | undefined): any {
		if (missionId) {
			return this.missions.find((m) => m._id === missionId);
		}
		return undefined;
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
		const value = this.group.getRawValue() as Chunk;
		return {
			...value,
			count: formParseInt(value.count)!,
			date: formParseFromDate(value.date as Date),
			mission: undefined,
			missionId: value.mission!._id,
		}
	}

	submit() {
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
			.subscribe((a) => this.reset({ missionId: (a as ApiActionSave<Chunk>).value.missionId }));
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
