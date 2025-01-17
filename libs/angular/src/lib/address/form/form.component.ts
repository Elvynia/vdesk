import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Address, AddressState } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';
import { addressActions } from '../address.actions';

@Component({
	selector: 'lv-address-form',
	imports: [
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		LoadingDirective,
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
})
export class AddressFormComponent
	extends ObserverCompomix()
	implements OnInit, OnChanges {
	@Input() group!: FormGroup;
	@Input() value?: Address;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Address>;
	pending: boolean;

	constructor(
		private formBuilder: FormBuilder,
		private store: Store<AddressState>,
		private actions: Actions
	) {
		super();
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
		return {
			...value,
		};
	}

	submit() {
		this.pending = true;
		this.save.next(this.getEditValue());
		this.actions
			.pipe(
				ofType(
					addressActions.createSuccess,
					addressActions.createError,
					addressActions.updateSuccess,
					addressActions.updateError
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

			city: [this.value?.city, [Validators.required]],

			firstname: [this.value?.firstname, []],

			lastname: [this.value?.lastname, [Validators.required]],

			line1: [this.value?.line1, [Validators.required]],

			line2: [this.value?.line2, []],

			zip: [this.value?.zip, [Validators.required]],
		});
	}
}
