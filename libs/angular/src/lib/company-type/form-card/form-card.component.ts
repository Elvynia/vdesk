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
import { CompanyType } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { companyTypeActions } from '../company-type.actions';
import { CompanyTypeFormComponent } from '../form/form.component';

@Component({
	selector: 'lv-company-type-form-card',
	imports: [
		CompanyTypeFormComponent,
		MatButtonModule,
		MatCardModule,
		LoadingDirective,
	],
	templateUrl: './form-card.component.html',
	styleUrl: './form-card.component.scss',
})
export class CompanyTypeFormCardComponent implements OnInit, OnChanges {
	@Input() value?: CompanyType;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<CompanyType>;
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

				name: value.name,

				identifierLabel: value.identifierLabel,

				currency: value.currency,
			} as CompanyType;
		} else {
			return {
				name: value.name,

				identifierLabel: value.identifierLabel,

				currency: value.currency,
			} as CompanyType;
		}
	}

	submit() {
		this.pending = true;
		this.save.next(this.getEditValue());
		this.actions
			.pipe(
				ofType(
					companyTypeActions.createSuccess,
					companyTypeActions.createError,
					companyTypeActions.updateSuccess,
					companyTypeActions.updateError
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

			identifierLabel: [
				this.value?.identifierLabel,
				[Validators.required],
			],

			currency: [this.value?.currency, [Validators.required]],
		});
	}
}
