import { Component, OnInit } from '@angular/core';
import { accountActions, AccountFormComponent, AccountListComponent, ApiAction, ObserverCompomix } from '@lv/angular';
import { Account, selectAccounts } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { filter, first, takeUntil, tap } from 'rxjs';

@Component({
	selector: 'lv-account-view',
	imports: [
		AccountListComponent,
		AccountFormComponent
	],
	templateUrl: './view.component.html',
	styleUrl: './view.component.scss'
})
export class AccountViewComponent extends ObserverCompomix() implements OnInit {
	accounts: Account[];
	editAccount?: Account;

	constructor(private store: Store<any>, private actions: Actions) {
		super();
		this.accounts = [];
	}

	ngOnInit() {
		this.store.select(selectAccounts).pipe(
			tap((s) => console.log(s)),
			filter((s) => !!s),
			takeUntil(this.destroy$)
		).subscribe((accounts) => this.accounts = Object.values(accounts));
		this.store.dispatch(accountActions.list());
	}

	cancel() {
		this.editAccount = undefined;
	}

	delete(value: Account) {
		if (this.editAccount?._id === value._id) {
			this.editAccount = undefined;
		}
		this.store.dispatch(accountActions.delete({ value }));
	}

	edit(account: Account) {
		this.editAccount = account;
	}

	get(valueId: string) {
		this.store.dispatch(accountActions.get({ valueId }));
	}

	save(value: Account) {
		let action;
		if (value._id) {
			action = accountActions.update({ value });
		} else {
			action = accountActions.create({ value });
		}
		this.store.dispatch(action);
		this.actions.pipe(
			ofType<ApiAction<Account> & Action>(accountActions.createSuccess, accountActions.createError,
				accountActions.updateSuccess, accountActions.updateError),
			first()
		).subscribe((action) => {
			if (action.success) {
				this.cancel();
			}
		});
	}
}
