import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { DateRange, MatCalendarCellClassFunction, MatCalendarView, MatDatepickerModule } from '@angular/material/datepicker';
import { Chunk, makeChunkFinder } from '@lv/common';
import { delay, EMPTY, finalize, from, of } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { formParseFromDate } from '../../util/form/form-parse-date';
import { MondayDateAdapter } from '../../util/monday-date-adapter';
import { ChunkCalendarSelectRange, ChunkCalendarSelectSingle } from './calendar.type';
import { getSiblingMonth } from '../../util/form/get-sibling-month';


@Component({
	selector: 'lv-chunk-calendar',
	imports: [
		CommonModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		LoadingDirective
	],
	encapsulation: ViewEncapsulation.None,
	host: {
		'class': /*tw*/ 'flex grow flex-col'
	},
	providers: [
		{
			provide: DateAdapter,
			useClass: MondayDateAdapter
		}
	],
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.scss',
})
export class ChunkCalendarComponent implements OnInit, OnChanges {
	@Input() chunks: Chunk[];
	@Input() startAt!: Date;
	@Input() range!: DateRange<Date> | null;
	@Input() selected!: Date | null;
	@Output() rangeChange: EventEmitter<ChunkCalendarSelectRange | null>;
	@Output() selectedChange: EventEmitter<ChunkCalendarSelectSingle | null>;
	@Output() startAtChange: EventEmitter<Date>;
	dateClass!: MatCalendarCellClassFunction<Date>;
	hasRange: boolean;
	chunkFinder!: ReturnType<typeof makeChunkFinder>;
	viewReload: boolean;

	constructor() {
		this.chunks = [];
		this.chunkFinder = makeChunkFinder([]);
		this.dateClass = this.dateClass = () => [];
		this.hasRange = false;
		this.rangeChange = new EventEmitter();
		this.selectedChange = new EventEmitter();
		this.startAtChange = new EventEmitter();
		this.viewReload = false;
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
		// Reload view once for delay -> viewReload = false to work.
		if (changes.chunks || changes.startAt) {
			if (this.chunks) {
				this.viewReload = true;
				if (changes.chunks) {
					this.chunkFinder = makeChunkFinder(this.chunks);
					// Using async and viewReload boolean to trigger material calendar when changing dateClass function.
					// Otherwise it won't be updated in calendar's view until the next calendar event.
					from(this.chunks).pipe(
						delay(0),
						finalize(() => this.viewReload = false)
					).subscribe(() => {
						this.dateClass = (d) => {
							const date = formParseFromDate(d);
							const dayChunks = this.chunkFinder(date);
							const chunkLoad = dayChunks
								.map((c) => c.count)
								.reduce((acc, c) => acc + c, 0);
							if (chunkLoad > 0) {
								let classes = ['chunk', 'c' + chunkLoad];
								if (chunkLoad > 12) {
									classes.push('triple');
								}
								if (dayChunks.some((c) => !c.invoiced && !c.paid)) {
									classes.push('pending');
								}
								if (dayChunks.some((c) => c.invoiced && !c.paid)) {
									classes.push('invoiced');
								}
								if (dayChunks.some((c) => c.paid)) {
									classes.push('paid');
								}
								if (dayChunks.some((c) => c.selected)) {
									classes.push('selected');
								}
								return classes;
							}
							return [];
						};
					});
				} else {
					of(null).pipe(
						delay(0),
						finalize(() => this.viewReload = false)
					).subscribe();
				}
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

	@HostListener('click', ['$event'])
	onClick(event: any) {
		const targetBtn = event.target.parentElement;
		if (targetBtn.ariaLabel && targetBtn.ariaLabel.includes("Previous month")) {
			this.startAt = getSiblingMonth(this.startAt, -1);
			this.startAtChange.next(this.startAt);
		} else if (targetBtn.ariaLabel && targetBtn.ariaLabel.includes("Next month")) {
			this.startAt = getSiblingMonth(this.startAt);
			this.startAtChange.next(this.startAt);
		}
	}

	private rangeNext() {
		this.rangeChange.next(this.range ? {
			type: 'range',
			range: this.range,
			chunks: this.chunkFinder(
				formParseFromDate(this.range.start!),
				formParseFromDate(this.range.end!)
			)
		} : null);
	}

	private selectedNext() {
		this.selectedChange.next(this.selected ? {
			type: 'single',
			date: this.selected,
			chunks: this.chunkFinder(formParseFromDate(this.selected))
		} : null);
	}
}
