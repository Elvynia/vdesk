import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Invoice, InvoiceState } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { invoiceActions } from '../invoice.actions';
import { InvoiceFormComponent } from '../form/form.component';

@Component({
	selector: 'lv-invoice-form-card',
	imports: [
		InvoiceFormComponent,
		MatButtonModule,
		MatCardModule,
		LoadingDirective,
	],
	templateUrl: './form-card.component.html',
	styleUrl: './form-card.component.scss',
})
export class InvoiceFormCardComponent implements OnInit, OnChanges {
	@Input() value?: Invoice;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Invoice>;
	group!: FormGroup;
	pending: boolean;

	constructor(private formBuilder: FormBuilder, private actions: Actions) {
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

				estimate: value.estimate,

				amount: parseFloat(value.amount.replace(/[$€]/g, '')),

				currency: value.currency,

				execStart: value.execStart,

				execEnd: value.execEnd,

				sent: value.sent,

				paid: value.paid,
			} as Invoice;
		} else {
			return {
				name: value.name,

				date: value.date,

				estimate: value.estimate,

				amount: parseFloat(value.amount.replace(/[$€]/g, '')),

				currency: value.currency,

				execStart: value.execStart,

				execEnd: value.execEnd,

				sent: value.sent,

				paid: value.paid,
			} as Invoice;
		}
	}

	submit() {
		this.pending = true;
		this.save.next(this.getEditValue());
		this.actions
			.pipe(
				ofType(
					invoiceActions.createSuccess,
					invoiceActions.createError,
					invoiceActions.updateSuccess,
					invoiceActions.updateError
				),
				first(),
				filter(({ success }) => !!success),
				finalize(() => (this.pending = false))
			)
			.subscribe(() => this.reset());
	}

	private reset() {
		this.group = this.formBuilder.group({
			_id: [
				{
					value: this.value?._id,
					disabled: true,
				},
			],

			name: [this.value?.name, [Validators.required]],

			date: [this.value?.date, [Validators.required]],

			estimate: [this.value?.estimate, [Validators.required]],

			amount: [this.value?.amount, [Validators.required]],

			currency: [this.value?.currency, [Validators.required]],

			execStart: [this.value?.execStart, [Validators.required]],

			execEnd: [this.value?.execEnd, [Validators.required]],

			sent: [this.value?.sent, [Validators.required]],

			paid: [this.value?.paid, []],
		});
	}
}
