import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { DateRange, MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { Chunk, makeChunkFinder } from '@lv/common';
import { delay, finalize, from } from 'rxjs';
import { LoadingDirective } from '../../loading/loading.directive';
import { formParseFromDate } from '../../util/form/form-parse-date';
import { MondayDateAdapter } from '../../util/monday-date-adapter';
import { ChunkCalendarSelectRange, ChunkCalendarSelectSingle } from './calendar.type';


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
		'class': 'flex w-full h-full'
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
		if (changes.chunks) {
			if (this.chunks) {
				this.chunkFinder = makeChunkFinder(this.chunks);
				this.viewReload = true;
				// Using async and viewReload boolean to trigger material calendar when changing dateClass function.
				// Otherwise it won't be updated in calendar's view until the next calendar event.
				from(this.chunks).pipe(
					delay(0),
					finalize(() => this.viewReload = false && console.log('debug: ',))
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
				})
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
