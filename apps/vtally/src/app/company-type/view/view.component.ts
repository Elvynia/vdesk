import { Component, OnInit } from '@angular/core';
import {
    ApiAction,
    companyTypeActions,
    CompanyTypeFormCardComponent,
    CompanyTypeListComponent,
    ObserverCompomix,
} from '@lv/angular';
import { CompanyType, selectCompanyTypes } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { filter, first, takeUntil } from 'rxjs';

@Component({
	selector: 'lv-company-type-view',
	imports: [CompanyTypeListComponent, CompanyTypeFormCardComponent],
	templateUrl: './view.component.html',
	host: {
		class: 'flex space-between gap-8 h-full w-full'
	}
})
export class CompanyTypeViewComponent
	extends ObserverCompomix()
	implements OnInit
{
	companyTypes: CompanyType[];
	editCompanyType?: CompanyType;

	constructor(private store: Store<any>, private actions: Actions) {
		super();
		this.companyTypes = [];
	}

	ngOnInit() {
		this.store
			.select(selectCompanyTypes)
			.pipe(
				filter((s) => !!s),
				takeUntil(this.destroy$)
			)
			.subscribe(
				(companyTypes) =>
					(this.companyTypes = Object.values(companyTypes))
			);
		this.store.dispatch(companyTypeActions.list());
	}

	cancel() {
		this.editCompanyType = undefined;
	}

	delete(value: CompanyType) {
		if (this.editCompanyType?._id === value._id) {
			this.editCompanyType = undefined;
		}
		this.store.dispatch(companyTypeActions.delete({ value }));
	}

	edit(companyType: CompanyType) {
		this.editCompanyType = companyType;
	}

	save(value: CompanyType) {
		let action;
		if (value._id) {
			action = companyTypeActions.update({ value });
		} else {
			action = companyTypeActions.create({ value });
		}
		this.store.dispatch(action);
		this.actions
			.pipe(
				ofType<ApiAction<CompanyType> & Action>(
					companyTypeActions.createSuccess,
					companyTypeActions.createError,
					companyTypeActions.updateSuccess,
					companyTypeActions.updateError
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
