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
import { Address } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { addressActions } from '../address.actions';
import { AddressFormComponent } from '../form/form.component';

@Component({
	selector: 'lv-address-form-card',
	imports: [
		AddressFormComponent,
		MatButtonModule,
		MatCardModule,
		LoadingDirective,
	],
	templateUrl: './form-card.component.html',
	styleUrl: './form-card.component.scss',
})
export class AddressFormCardComponent implements OnInit, OnChanges {
	@Input() value?: Address;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Address>;
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

				city: value.city,

				firstname: value.firstname,

				lastname: value.lastname,

				line1: value.line1,

				line2: value.line2,

				zip: value.zip,
			} as Address;
		} else {
			return {
				city: value.city,

				firstname: value.firstname,

				lastname: value.lastname,

				line1: value.line1,

				line2: value.line2,

				zip: value.zip,
			} as Address;
		}
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
