
import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Invoice, InvoiceCreate, InvoiceLine, InvoiceSave, InvoiceUpdate, Mission } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, finalize, first, startWith, takeUntil } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { HasMissionActiveState, selectMissionActive } from '../../mission/active/mission-active.store';
import { ApiActionSave } from '../../util/api.action';
import { formParseFloat } from '../../util/form/form-parse-number';
import { ObserverCompomix } from '../../util/mixins/observer.compomix';
import { InvoiceFormComponent } from '../form/form.component';
import { InvoiceGeneratorComponent } from '../generator/generator.component';
import { invoiceActions } from '../invoice.actions';
import { missionActions } from '../../mission/mission.actions';

type MissionSelectable = Mission & { disabled?: boolean };

@Component({
	selector: 'lv-invoice-form-card',
	imports: [
		CommonModule,
		InvoiceFormComponent,
		InvoiceGeneratorComponent,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatExpansionModule,
		MatIconModule,
		MatListModule,
		ReactiveFormsModule,
		LoadingDirective,
	],
	templateUrl: './form-card.component.html',
	host: {
		style: `
		--mat-expansion-header-collapsed-state-height: min-content;
		`
	}
})
export class InvoiceFormCardComponent extends ObserverCompomix() implements OnInit, OnChanges {
	@Input() value?: Invoice;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<InvoiceCreate | InvoiceUpdate>;
	@ViewChild('formPanel') formPanel!: MatExpansionPanel;
	generatorExpanded: boolean;
	group!: FormGroup;
	missionLabel?: string;
	missionList: MissionSelectable[];
	pending: boolean;
	idComparator = (a: Mission, b: Mission) => a?._id === b?._id;

	get groupGenerate() {
		return this.group.controls.generate.value as boolean;
	}

	get groupLines() {
		return this.group.controls.lines as FormArray;
	}

	get groupMissions() {
		return (this.group.controls.missions.value || []) as Mission[];
	}

	constructor(
		private store: Store<HasMissionActiveState>,
		private formBuilder: FormBuilder,
		private actions: Actions
	) {
		super();
		this.back = new EventEmitter();
		this.save = new EventEmitter();
		this.generatorExpanded = false;
		this.missionList = [];
		this.pending = false;
	}

	ngOnInit(): void {
		// TODO: handle pending ?
		this.store.select(selectMissionActive).pipe(
			takeUntil(this.destroy$)
		).subscribe((missions) => this.missionList = Object.values(missions));
		this.store.dispatch(missionActions.listenActive());
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value']) {
			this.reset();
		}
	}

	cancel() {
		this.formPanel.close();
		this.reset();
		this.back.next();
	}

	updateGeneratePanel(event: MatCheckboxChange, genPanel: MatExpansionPanel) {
		if (event.checked && !genPanel.expanded) {
			genPanel.open();
		} else if (genPanel.expanded) {
			genPanel.close();
		}
	}

	updateMissionDisabled() {
		const restricted = this.groupMissions.length > 0;
		this.missionList.forEach((m) => m.disabled = restricted && m.companyId !== this.groupMissions[0].companyId);
	}

	private findMissions(missionIds: string[] | undefined) {
		if (missionIds) {
			return this.missionList.filter((m) => missionIds.includes(m._id));
		}
		return [];
	}

	getEditValue(): InvoiceSave {
		const value = this.group.getRawValue();
		let result = {
			amount: formParseFloat(value.amount)!,
			companyId: value.companyId,
			createdOn: value.createdOn,
			estimate: value.estimate,
			execEnd: value.execEnd,
			execStart: value.execStart,
			lines: value.lines.map((l: InvoiceLine) => ({
				...l,
				price: formParseFloat(l.price)
			})),
			missionIds: value.missions.map((m: Mission) => m._id),
			name: value.name,
			paid: value.paid,
			paymentLimit: value.paymentLimit,
			sent: value.sent,
			tax: value.tax,
			// FIXME: Put tax multiplier in config
			taxMultiplier: value.tax ? 20 : undefined,
		} satisfies InvoiceCreate;
		if (value._id) {
			return {
				...result,
				_id: value._id,
			} satisfies InvoiceUpdate;
		} else {
			return result;
		}
	}

	lineAdd(line?: InvoiceLine) {
		this.groupLines.push(this.lineCreate(line));
	}

	lineCreate(line?: InvoiceLine) {
		return this.formBuilder.nonNullable.group({
			count: [line?.count, [Validators.required]],
			chunkIds: [line?.chunkIds, [Validators.required]],
			desc: [line?.desc],
			price: [line?.price, [Validators.required]],
		});
	}

	lineRemove(index: number) {
		this.groupLines.removeAt(index);
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
			.subscribe((a) => {
				this.reset({ missionIds: (a as any as ApiActionSave<Invoice>).value.missionIds });
			});
	}

	private reset(value?: Partial<Invoice>) {
		value = value || this.value;
		this.group = this.formBuilder.nonNullable.group({
			_id: [
				{
					value: value?._id,
					disabled: true,
				},
			],
			amount: [value?.amount, [Validators.required]],
			companyId: [value?.companyId, [Validators.required]],
			createdOn: [value?.createdOn || new Date(), [Validators.required]],
			estimate: [value?.estimate || false, [Validators.required]],
			execStart: [value?.execStart, [Validators.required]],
			execEnd: [value?.execEnd, [Validators.required]],
			lines: this.formBuilder.nonNullable.array(
				this.value ? this.value.lines.map((l) => this.lineCreate(l)) : [],
				[Validators.required]
			),
			missions: [this.findMissions(value?.missionIds), [Validators.required]],
			name: [value?.name, [Validators.required]],
			paid: [value?.paid || false],
			paymentLimit: [value?.paymentLimit, [Validators.required]],
			sent: [value?.sent || false],
			tax: [value?.tax || false],
			// Form specific
			generate: [!this.value]
		});
		this.group.controls.missions.valueChanges.pipe(
			startWith(this.group.controls.missions.value)
		).subscribe(
			(missions: Mission[]) => {
				const hasMissions = missions.length > 0;
				this.missionLabel = hasMissions ? missions.map((m) => m.name).join(', ') : undefined;
				this.group.controls.companyId.setValue(hasMissions ? missions[0].companyId : undefined);
				this.generatorExpanded = hasMissions && this.group.controls.generate.value;
				this.updateMissionDisabled();
			}
		);
	}
}
