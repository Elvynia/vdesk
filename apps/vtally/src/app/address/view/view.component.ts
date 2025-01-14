import { Component, OnInit } from '@angular/core';
import {
	addressActions,
	AddressFormComponent,
	AddressListComponent,
	ApiAction,
	ObserverCompomix,
} from '@lv/angular';
import { Address, selectAddresses } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { filter, first, takeUntil } from 'rxjs';

@Component({
	selector: 'lv-address-view',
	imports: [AddressListComponent, AddressFormComponent],
	templateUrl: './view.component.html',
	styleUrl: './view.component.scss',
})
export class AddressViewComponent extends ObserverCompomix() implements OnInit {
	addresses: Address[];
	editAddress?: Address;

	constructor(private store: Store<any>, private actions: Actions) {
		super();
		this.addresses = [];
	}

	ngOnInit() {
		this.store
			.select(selectAddresses)
			.pipe(
				filter((s) => !!s),
				takeUntil(this.destroy$)
			)
			.subscribe(
				(addresses) => (this.addresses = Object.values(addresses))
			);
		this.store.dispatch(addressActions.list());
	}

	cancel() {
		this.editAddress = undefined;
	}

	delete(value: Address) {
		if (this.editAddress?._id === value._id) {
			this.editAddress = undefined;
		}
		this.store.dispatch(addressActions.delete({ value }));
	}

	edit(address: Address) {
		this.editAddress = address;
	}

	save(value: Address) {
		let action;
		if (value._id) {
			action = addressActions.update({ value });
		} else {
			action = addressActions.create({ value });
		}
		this.store.dispatch(action);
		this.actions
			.pipe(
				ofType<ApiAction<Address> & Action>(
					addressActions.createSuccess,
					addressActions.createError,
					addressActions.updateSuccess,
					addressActions.updateError
				),
				first()
			)
			.subscribe((action) => {
				if (action.success) {
					this.cancel();
				}
			});
	}
}
