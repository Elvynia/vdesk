
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { Invoice, InvoiceLine, Mission } from '@lv/common';
import { Actions, ofType } from '@ngrx/effects';
import { filter, finalize, first } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { MissionService } from '../../mission/mission.service';
import { formParseFloat } from '../../util/form/form-parse-number';
import { InvoiceFormComponent } from '../form/form.component';
import { InvoiceGeneratorComponent } from '../generator/generator.component';
import { invoiceActions } from '../invoice.actions';

type MissionSelectable = Mission & { disabled?: boolean };

@Component({
	selector: 'lv-invoice-form-card',
	imports: [
    InvoiceFormComponent,
    InvoiceGeneratorComponent,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule,
    ReactiveFormsModule,
    LoadingDirective
],
	templateUrl: './form-card.component.html',
	styleUrl: './form-card.component.scss',
})
export class InvoiceFormCardComponent implements OnInit, OnChanges {
	@Input() value?: Invoice;
	@Output() back: EventEmitter<void>;
	@Output() save: EventEmitter<Invoice>;
	generatorExpanded: boolean;
	group!: FormGroup;
	missionLabel?: string;
	missionList: MissionSelectable[];
	pending: boolean;

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
		private missionService: MissionService,
		private formBuilder: FormBuilder,
		private actions: Actions
	) {
		this.back = new EventEmitter();
		this.save = new EventEmitter();
		this.generatorExpanded = false;
		this.missionList = [];
		this.pending = true;
	}

	ngOnInit(): void {
		this.fetchMissions();
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

	fetchMissions() {
		this.pending = true;
		this.missionService.sendListActive().pipe(
			finalize(() => this.pending = false)
		).subscribe((missions) => {
			this.missionList = missions;
			this.reset();
		});
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

	getEditValue() {
		const value = this.group.getRawValue();
		let result = {
			amount: formParseFloat(value.amount),
			companyId: value.companyId,
			currency: value.currency,
			date: value.date,
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
			sent: value.sent,
			tax: value.tax,
			// FIXME: Put tax multiplier in config
			taxMultiplier: value.tax ? 20 : undefined,
		} as Invoice;
		if (value._id) {
			return {
				...result,
				_id: value._id,
			}
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
			.subscribe(() => this.fetchMissions());
	}

	private reset() {
		this.group = this.formBuilder.nonNullable.group({
			_id: [
				{
					value: this.value?._id,
					disabled: true,
				},
			],
			name: [this.value?.name, [Validators.required]],
			date: [this.value?.date || new Date(), [Validators.required]],
			estimate: [this.value?.estimate || false, [Validators.required]],
			amount: [this.value?.amount, [Validators.required]],
			companyId: [this.value?.companyId, [Validators.required]],
			currency: [this.value?.currency, [Validators.required]],
			execStart: [this.value?.execStart, [Validators.required]],
			execEnd: [this.value?.execEnd, [Validators.required]],
			sent: [this.value?.sent || false],
			paid: [this.value?.paid || false],
			tax: [this.value?.tax || false],
			missions: [this.findMissions(this.value?.missionIds), [Validators.required]],
			lines: this.formBuilder.nonNullable.array([], [Validators.required]),
			// Form specific
			generate: [!this.value]
		});
		this.group.controls.missions.valueChanges.subscribe(
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
