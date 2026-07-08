import { Component, OnInit } from '@angular/core';
import {
	companyActions,
	CompanyFormCardComponent,
	CompanyListComponent,
	isApiActionSuccess,
	ObserverCompomix
} from '@lv/angular';
import { Company, selectCompanies } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, first, takeUntil } from 'rxjs';

@Component({
	selector: 'lv-company-view',
	imports: [CompanyListComponent, CompanyFormCardComponent],
	templateUrl: './view.component.html',
	host: {
		class: /*tw*/ 'flex flex-col lg:flex-row space-between gap-8 h-full w-full'
	}
})
export class CompanyViewComponent extends ObserverCompomix() implements OnInit {
	companies: Company[];
	editCompany?: Company;

	constructor(private store: Store<any>, private actions: Actions) {
		super();
		this.companies = [];
	}

	ngOnInit() {
		this.store
			.select(selectCompanies)
			.pipe(
				filter((s) => !!s),
				takeUntil(this.destroy$)
			)
			.subscribe(
				(companies) => (this.companies = Object.values(companies))
			);
		this.store.dispatch(companyActions.list());
	}

	cancel() {
		this.editCompany = undefined;
	}

	delete(value: Company) {
		if (this.editCompany?._id === value._id) {
			this.editCompany = undefined;
		}
		this.store.dispatch(companyActions.delete({ value }));
	}

	edit(company: Company) {
		this.editCompany = company;
	}

	save(value: Company) {
		let action;
		if (value._id) {
			action = companyActions.update({ value });
		} else {
			action = companyActions.create({ value });
		}
		this.store.dispatch(action);
		this.actions
			.pipe(
				ofType(
					companyActions.createSuccess,
					companyActions.createError,
					companyActions.updateSuccess,
					companyActions.updateError
				),
				first(),
				filter((action) => isApiActionSuccess(action))
			).subscribe(() => {
				this.cancel();
			});
	}
}
