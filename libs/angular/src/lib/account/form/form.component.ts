import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Account, AccountState, Role, RoleState, selectRoles } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { finalize, first, takeUntil } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { roleActions } from '../../role/role.actions';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';
import { accountActions } from '../account.actions';

@Component({
	selector: 'lv-account-form',
	imports: [
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		LoadingDirective
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class AccountFormComponent extends ObserverCompomix() implements OnInit, OnChanges {
	@Input() group!: FormGroup;
	@Input() value?: Account;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Account>;
	pending: boolean;
	roles: Role[];

	constructor(private formBuilder: FormBuilder,
		private store: Store<AccountState & RoleState>,
		private actions: Actions
	) {
		super();
		this.back = new EventEmitter();
		this.save = new EventEmitter();
		this.roles = [];
		this.pending = false;
	}

	ngOnInit(): void {
		this.store.select(selectRoles).pipe(
			takeUntil(this.destroy$)
		).subscribe((roles) => this.roles = Object.values(roles));
		this.store.dispatch(roleActions.list());
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

	compareRole(r1: Role, r2: Role) {
		return r1?._id === r2?._id;
	}

	getEditValue() {
		const value = this.group.getRawValue();
		if (value._id) {
			return {
				_id: value._id,
				email: value.email,
				enabled: value.enabled,
				role: value.role._id
			}
		} else {
			return {
				...value,
				role: value.role._id
			};
		}
	}

	submit() {
		this.pending = true;
		this.save.next(this.getEditValue());
		this.actions.pipe(
			ofType(accountActions.createSuccess, accountActions.createError,
				accountActions.updateSuccess, accountActions.updateError
			),
			first(),
			finalize(() => this.pending = false)
		).subscribe();
	}

	private reset() {
		this.group = this.formBuilder.group({
			_id: [{
				value: this.value?._id,
				disabled: true
			}],
			username: [this.value?.username, [Validators.required]],
			password: [this.value?.username, [Validators.required]],
			email: [this.value?.email, [Validators.required, Validators.email]],
			enabled: [this.value?.enabled],
			role: [this.value?.role, [Validators.required]],
		});
	}
}
