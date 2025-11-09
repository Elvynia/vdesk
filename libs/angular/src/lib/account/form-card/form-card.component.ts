import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Account } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { accountActions } from '../account.actions';
import { AccountFormComponent } from '../form/form.component';

@Component({
	selector: 'lv-account-form-card',
	imports: [
		MatButtonModule,
		LoadingDirective,
		MatCardModule,
		AccountFormComponent
	],
	templateUrl: './form-card.component.html',
	styleUrl: './form-card.component.css'
})
export class AccountFormCardComponent implements OnInit, OnChanges {
	@Input() value?: Account;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Account>;
	group!: FormGroup;
	pending: boolean;

	constructor(private formBuilder: FormBuilder,
		private actions: Actions
	) {
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
			filter(({ success }) => !!success),
			finalize(() => (this.pending = false))
		)
			.subscribe(() => this.reset());
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
