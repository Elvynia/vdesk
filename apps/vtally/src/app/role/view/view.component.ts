import { Component, OnInit } from '@angular/core';
import {
	isApiActionSuccess,
	ObserverCompomix,
	roleActions,
	RoleFormCardComponent,
	RoleListComponent
} from '@lv/angular';
import { Role, selectRoles } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, first, takeUntil } from 'rxjs';

@Component({
	selector: 'lv-role-view',
	imports: [RoleListComponent, RoleFormCardComponent],
	templateUrl: './view.component.html',
	host: {
		class: /*tw*/ 'flex flex-col lg:flex-row space-between gap-8 h-full w-full'
	}
})
export class RoleViewComponent extends ObserverCompomix() implements OnInit {
	roles: Role[];
	editRole?: Role;

	constructor(private store: Store<any>, private actions: Actions) {
		super();
		this.roles = [];
	}

	ngOnInit() {
		this.store
			.select(selectRoles)
			.pipe(
				filter((s) => !!s),
				takeUntil(this.destroy$)
			)
			.subscribe((roles) => (this.roles = Object.values(roles)));
		this.store.dispatch(roleActions.list());
	}

	cancel() {
		this.editRole = undefined;
	}

	delete(value: Role) {
		if (this.editRole?._id === value._id) {
			this.editRole = undefined;
		}
		this.store.dispatch(roleActions.delete({ value }));
	}

	edit(role: Role) {
		this.editRole = role;
	}

	save(value: Role) {
		let action;
		if (value._id) {
			action = roleActions.update({ value });
		} else {
			action = roleActions.create({ value });
		}
		this.store.dispatch(action);
		this.actions
			.pipe(
				ofType(
					roleActions.createSuccess,
					roleActions.createError,
					roleActions.updateSuccess,
					roleActions.updateError
				),
				first(),
				filter((action) => isApiActionSuccess(action))
			).subscribe(() => {
				this.cancel();
			});
	}
}
