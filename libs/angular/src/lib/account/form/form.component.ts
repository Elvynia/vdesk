import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Account } from '@lv/common';

@Component({
	selector: 'lv-account-form',
	imports: [
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class AccountFormComponent implements OnInit, OnChanges {
	@Input() group!: FormGroup;
	@Input() value?: Account;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Account>;

	constructor(private formBuilder: FormBuilder) {
		this.back = new EventEmitter();
		this.save = new EventEmitter();
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

	submit() {
		this.save.next(this.group.getRawValue());
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
		});
	}
}
