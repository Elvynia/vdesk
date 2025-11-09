import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Account, AccountState, Role, RoleState, selectRoles } from '@lv/common';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { roleActions } from '../../role/role.actions';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';

@Component({
	selector: 'lv-account-form',
	imports: [
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.css'
})
export class AccountFormComponent extends ObserverCompomix() implements OnInit {
	@Input() group!: FormGroup;
	@Input() value?: Account;
	roles: Role[];

	constructor(
		private store: Store<AccountState & RoleState>
	) {
		super();
		this.roles = [];
	}

	ngOnInit(): void {
		this.store.select(selectRoles).pipe(
			takeUntil(this.destroy$)
		).subscribe((roles) => this.roles = Object.values(roles));
		this.store.dispatch(roleActions.list());
	}

	compareRole(r1: Role, r2: Role) {
		return r1?._id === r2?._id;
	}
}
