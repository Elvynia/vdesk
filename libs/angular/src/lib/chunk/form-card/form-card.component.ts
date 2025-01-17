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
import { Chunk, ChunkState } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
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

				count: parseInt(value.count),

				date: value.date,

				desc: value.desc,

				invoiced: value.invoiced,

				paid: value.paid,
			} as Chunk;
		} else {
			return {
				count: parseInt(value.count),

				date: value.date,

				desc: value.desc,

				invoiced: value.invoiced,

				paid: value.paid,
			} as Chunk;
		}
	}

	submit() {
		this.pending = true;
		this.save.next(this.getEditValue());
		this.actions
			.pipe(
				ofType(
					chunkActions.createSuccess,
					chunkActions.createError,
					chunkActions.updateSuccess,
					chunkActions.updateError
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

			count: [this.value?.count, [Validators.required]],

			date: [this.value?.date, [Validators.required]],

			desc: [this.value?.desc, [Validators.required]],

			invoiced: [this.value?.invoiced, [Validators.required]],

			paid: [this.value?.paid, [Validators.required]],
		});
	}
}
