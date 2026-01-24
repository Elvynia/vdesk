import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRange, MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { Chunk } from '@lv/common';
import { formParseFromDate } from '../../util/form/form-parse-date';

@Component({
	selector: 'lv-chunk-calendar',
	imports: [
		CommonModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,
	],
	encapsulation: ViewEncapsulation.None,
	host: {
		'class': 'block w-full border-2 border-amber-600'
	},
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.css',
})
export class ChunkCalendarComponent implements OnInit, OnChanges {
	@Input() chunks: Chunk[];
	@Input() startAt!: Date;
	@Input() range!: DateRange<Date> | null;
	@Input() selected!: Date | null;
	@Output() rangeChange: EventEmitter<DateRange<Date> | null>;
	@Output() selectedChange: EventEmitter<Date | null>;
	dateClass!: MatCalendarCellClassFunction<Date>;
	hasRange: boolean;

	constructor() {
		this.chunks = [];
		this.dateClass = this.dateClass = () => [];
		this.hasRange = false;
		this.selectedChange = new EventEmitter();
		this.rangeChange = new EventEmitter();
	}

	ngOnInit() {
		if (!this.startAt) {
			const now = new Date();
			now.setDate(1);
			this.startAt = now;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.range && changes.range.firstChange) {
			this.hasRange = true;
		}
		if (changes.chunks) {
			if (this.chunks) {
				this.dateClass = (d) => {
					const date = formParseFromDate(d);
					const chunkLoad = this.chunks.filter((c) => c.date === date)
						.map((c) => c.count)
						.reduce((acc, c) => acc + c, 0);
					if (chunkLoad > 0) {
						return ['chunk', 'c' + chunkLoad];
					}
					return [];
				};
			} else {
				this.chunks = [];
				this.dateClass = this.dateClass = () => [];
			}
		}
	}

	updateSelected(date: Date | null) {
		if (date) {
			this.selected = date;
			this.selectedNext();
			if (
				this.hasRange &&
				this.range &&
				this.range.start &&
				date > this.range.start &&
				!this.range.end
			) {
				this.range = new DateRange(
					this.range.start,
					date
				);
				this.rangeNext();
			} else {
				this.range = new DateRange(date, null);
			}
		} else {
			this.selected = null;
			this.range = null;
			this.selectedNext();
			this.rangeNext();
		}
	}

	private rangeNext() {
		this.rangeChange.next(this.range);
	}

	private selectedNext() {
		this.selectedChange.next(this.selected);
	}
}
