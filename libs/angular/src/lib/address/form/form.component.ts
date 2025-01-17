import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Address, AddressState } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';

@Component({
	selector: 'lv-address-form',
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],

	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
})
export class AddressFormComponent extends ObserverCompomix() {
	@Input() group!: FormGroup;
	@Input() value?: Address;

	constructor() {
		super();
	}
}
