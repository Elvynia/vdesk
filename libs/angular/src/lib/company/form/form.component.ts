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
import { Company, CompanyState } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, finalize, first, takeUntil } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';
import { companyActions } from '../company.actions';

import { MatSelectModule } from '@angular/material/select';

import { CompanyType, CompanyTypeState, selectCompanyTypes } from '@lv/common';
import { companyTypeActions } from '../../company-type/company-type.actions';

import { Address, AddressState, selectAddresses } from '@lv/common';
import { addressActions } from '../../address/address.actions';

@Component({
	selector: 'lv-company-form',
	imports: [
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,

		MatSelectModule,

		ReactiveFormsModule,
		LoadingDirective
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
})
export class CompanyFormComponent
	extends ObserverCompomix()
	implements OnInit, OnChanges {
	@Input() group!: FormGroup;
	@Input() value?: Company;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Company>;
	pending: boolean;

	companyTypeList: CompanyType[];

	addressList: Address[];

	constructor(
		private formBuilder: FormBuilder,

		private store: Store<CompanyState & CompanyTypeState & AddressState>,

		private actions: Actions
	) {
		super();
		this.back = new EventEmitter();
		this.save = new EventEmitter();

		this.companyTypeList = [];

		this.addressList = [];

		this.pending = false;
	}

	ngOnInit(): void {
		this.store
			.select(selectCompanyTypes)
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				(companyTypeList) =>
					(this.companyTypeList = Object.values(companyTypeList))
			);
		this.store.dispatch(companyTypeActions.list());

		this.store
			.select(selectAddresses)
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				(addressList) => (this.addressList = Object.values(addressList))
			);
		this.store.dispatch(addressActions.list());

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

	compareId(e1: any, e2: any) {
		return e1?._id === e2?._id;
	}

	getEditValue() {
		const value = this.group.getRawValue();
		if (value._id) {
			return {
				_id: value._id,

				name: value.name,

				identifier: value.identifier,

				type: value.type._id,

				address: value.address._id,
			} as Company;
		} else {
			return {
				name: value.name,

				identifier: value.identifier,

				type: value.type._id,

				address: value.address?._id,
			} as Company;
		}
	}

	submit() {
		this.pending = true;
		this.save.next(this.getEditValue());
		this.actions
			.pipe(
				ofType(
					companyActions.createSuccess,
					companyActions.createError,
					companyActions.updateSuccess,
					companyActions.updateError
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

			identifier: [this.value?.identifier, [Validators.required]],

			type: [this.value?.type, [Validators.required]],

			address: [this.value?.address, []],
		});
	}
}
