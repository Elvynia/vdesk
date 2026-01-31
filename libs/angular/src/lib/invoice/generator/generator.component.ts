import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { DateRange } from '@angular/material/datepicker';
import { Chunk, Company, distinctUntilAnyKeyChanged, findDayOfWeek, InvoiceLine, makeInvoiceLineWeek, Mission } from '@lv/common';
import { distinctUntilChanged, map, startWith } from 'rxjs';
import { ChunkCalendarComponent } from '../../chunk/calendar/calendar.component';
import { ChunkCalendarSelectRange } from '../../chunk/calendar/calendar.type';

@Component({
	selector: 'lv-invoice-generator',
	imports: [
		ChunkCalendarComponent,
		CommonModule,
		MatButtonModule,
	],
	templateUrl: './generator.component.html',
	styleUrl: './generator.component.css',
	providers: [
		CurrencyPipe
	]
})
export class InvoiceGeneratorComponent implements OnChanges {
	@Input() group!: FormGroup;
	@Output() lineAdded: EventEmitter<InvoiceLine>;
	@Output() lineRemoved: EventEmitter<number>;
	chunks: Chunk[];
	lines!: InvoiceLine[];
	selected!: DateRange<Date> | null;
	startAt!: Date;

	constructor(private currencyPipe: CurrencyPipe) {
		this.chunks = [];
		this.lineAdded = new EventEmitter();
		this.lineRemoved = new EventEmitter();
		const now = new Date();
		now.setMonth(now.getMonth() - 1);
		now.setDate(1);
		this.startAt = now;
		this.reset();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.group && this.group) {
			this.reset();
			this.group.controls.missions.valueChanges.pipe(
				startWith(this.group.controls.missions.value),
				map((missions) => {
					let currency = '';
					let name = '';
					if (missions && missions.length > 0) {
						const currentYear = new Date().getFullYear();
						const company = missions[0].company as Company;
						const count = (company.invoiceCount! + 1).toString().padStart(2, '0');
						currency = company.type.currency;
						name = `${currentYear}-${company.trigram}-${count}`;
					}
					return { currency, name };
				}),
				distinctUntilAnyKeyChanged(['currency', 'name'])
			).subscribe((values) => {
				Object.entries(values).forEach(([k, v]) => this.group.get(k)?.setValue(v));
			});
			this.group.controls.missions.valueChanges.pipe(
				startWith(this.group.controls.missions.value),
				distinctUntilChanged((a: Mission[], b: Mission[]) => {
					const aIds = a.map((am) => am._id);
					const bIds = b.map((bm) => bm._id);
					return aIds.every((aid) => bIds.includes(aid)) && bIds.every((bid) => aIds.includes(bid));
				}),
			).subscribe((missions: Mission[]) => {
				this.reset();
				if (missions && missions.length > 0) {
					this.chunks = missions.flatMap((m) => m.chunks);
				} else {
					this.chunks = [];
				}
			});
		}
	}

	addLines() {
		this.lines.forEach((l) => this.lineAdded.next({ ...l }));
		// TODO update fields
		const createdOn = this.group.controls.createdOn.value as Date;
		this.group.controls.paymentLimit.setValue(new Date(createdOn.getFullYear(), createdOn.getMonth() + 1, 0));
		this.group.controls.amount.setValue(
			this.currencyPipe.transform(
				(this.group.controls.lines.value as InvoiceLine[])
					.map((l) => l.count * l.price)
					.reduce((acc, c) => acc + c, 0)
			)
		);
		this.reset();
	}

	makeLines(range: DateRange<Date>) {
		let start = findDayOfWeek(range.start!);
		while (start) {
			let week = findDayOfWeek(start, 7);
			let end = week.getTime() > range.end!.getTime() ? range.end! : week;
			end.setHours(23, 59, 59);
			let weekChunks = this.chunks.filter((c) => {
				const cDate = new Date(c.date).getTime();
				return start.getTime() <= cDate && cDate <= end.getTime();
			});
			if (weekChunks.length > 0) {
				this.lines.push(makeInvoiceLineWeek({
					missions: this.group.controls.missions.value,
					chunks: weekChunks,
					start: new Date(start),
					end: new Date(end)
				}));
			}
			if (end.getTime() === range.end!.getTime()) {
				start = undefined as any;
			} else {
				start = findDayOfWeek(new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7));
			}
		}
	}

	updateSelected(selection: ChunkCalendarSelectRange | null) {
		if (selection) {
			this.selected = selection.range;
			this.makeLines(this.selected);
			const execStart = this.group.controls.execStart;
			const execEnd = this.group.controls.execEnd;
			if (!execStart.value || execStart.value.getTime() > this.selected.start!.getTime()) {
				execStart.setValue(this.selected.start);
			}
			if (!execEnd.value || execEnd.value.getTime() < this.selected.end!.getTime()) {
				execEnd.setValue(this.selected.end);
			}
		} else {
			this.reset();
		}
	}

	reset() {
		this.lines = [];
		this.selected = null;
	}
}
