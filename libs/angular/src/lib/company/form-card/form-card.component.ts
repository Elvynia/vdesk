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
import { Company } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { companyActions } from '../company.actions';
import { CompanyFormComponent } from '../form/form.component';

@Component({
	selector: 'lv-company-form-card',
	imports: [
		CompanyFormComponent,
		MatButtonModule,
		MatCardModule,
		LoadingDirective,
	],
	templateUrl: './form-card.component.html',
})
export class CompanyFormCardComponent implements OnInit, OnChanges {
	@Input() value?: Company;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Company>;
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
				identifier: value.identifier,
				trigram: value.trigram,
				taxNumber: value.taxNumber,
				type: value.type._id,
				address: value.address?._id,
			} as Company;
		} else {
			return {
				name: value.name,
				identifier: value.identifier,
				trigram: value.trigram,
				taxNumber: value.taxNumber,
				type: value.type._id,
				address: value.address?._id,
			} as Company;
		}
	}

	submit() {
		this.pending = true;
		this.save.next(this.getEditValue());
		this.actions
			.pipe(
				ofType(
					companyActions.createSuccess,
					companyActions.createError,
					companyActions.updateSuccess,
					companyActions.updateError
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
			identifier: [this.value?.identifier, [Validators.required]],
			trigram: [this.value?.trigram, [Validators.required]],
			taxNumber: [this.value?.taxNumber],
			type: [this.value?.type, [Validators.required]],
			address: [this.value?.address, []],
		});
	}
}
