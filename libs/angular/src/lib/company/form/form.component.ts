import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Company, CompanyState } from '@lv/common';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';

import { MatSelectModule } from '@angular/material/select';

import { CompanyType, CompanyTypeState, selectCompanyTypes } from '@lv/common';
import { companyTypeActions } from '../../company-type/company-type.actions';

import { Address, AddressState, selectAddresses } from '@lv/common';
import { addressActions } from '../../address/address.actions';

@Component({
	selector: 'lv-company-form',
	imports: [
		MatFormFieldModule,
		MatInputModule,

		MatSelectModule,

		ReactiveFormsModule,
	],

	templateUrl: './form.component.html',
})
export class CompanyFormComponent extends ObserverCompomix() implements OnInit {
	@Input() group!: FormGroup;
	@Input() value?: Company;

	companyTypeList: CompanyType[];

	addressList: Address[];

	constructor(
		private store: Store<CompanyState & CompanyTypeState & AddressState>
	) {
		super();

		this.companyTypeList = [];

		this.addressList = [];
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
	}

	compareId(e1: any, e2: any) {
		return e1?._id === e2?._id;
	}
}
