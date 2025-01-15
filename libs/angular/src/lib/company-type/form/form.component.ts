import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompanyType, CompanyTypeState } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { finalize, first, takeUntil } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';
import { companyTypeActions } from '../company-type.actions';

@Component({
	selector: 'lv-company-type-form',
	imports: [
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,

		ReactiveFormsModule,
		LoadingDirective,
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
})
export class CompanyTypeFormComponent
	extends ObserverCompomix()
	implements OnInit, OnChanges
{
	@Input() group!: FormGroup;
	@Input() value?: CompanyType;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<CompanyType>;
	pending: boolean;

	constructor(
		private formBuilder: FormBuilder,
		private store: Store<CompanyTypeState>,
		private actions: Actions
	) {
		super();
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
				finalize(() => (this.pending = false))
			)
			.subscribe(({ success }) => {
				if (success) {
					this.reset();
				}
			});
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
