import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { Chunk, Mission } from '@lv/common';
import { Store } from '@ngrx/store';
import { fromEvent, merge, takeUntil } from 'rxjs';
import { LoadingDirective } from "../../loading/loading.directive";
import { ObserverCompomix } from '../../util/mixins/observer.compomix';
import { ChunkCalendarComponent } from '../calendar/calendar.component';
import { ChunkCalendarSelect, ChunkCalendarSelectSingle } from '../calendar/calendar.type';
import { chunkActions } from '../chunk.actions';
import { ChunkFormCardComponent } from '../form-card/form-card.component';
import { getSiblingMonth } from '../../util/form/get-sibling-month';

@Component({
	selector: 'lv-chunk-editor',
	imports: [
		CommonModule,
		ChunkCalendarComponent,
		ChunkFormCardComponent,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatSidenavModule,
		MatSliderModule,
		LoadingDirective,
	],
	templateUrl: './editor.component.html',
	styleUrl: './editor.component.css',
	host: {
		class: /*tw*/ 'flex flex-col gap-2 h-full max-w-4xl'
	},
})
export class ChunkEditorComponent extends ObserverCompomix() implements OnChanges, OnInit {
	@Input() missions: Mission[];
	chunk?: Partial<Chunk>;
	chunks: Chunk[];
	keys: { alt: boolean, shift: boolean };
	currentMonth: Date;
	nextMonth!: Date;
	selected: ChunkCalendarSelectSingle | null;
	selectedChunks?: Record<string, Chunk[]>;

	constructor(
		private store: Store
	) {
		super();
		this.chunks = [];
		this.missions = [];
		const now = new Date();
		this.keys = { alt: false, shift: false };
		this.currentMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		this.updateNextMonth();
		this.selected = null;
	}

	ngOnInit(): void {
		merge(
			fromEvent<KeyboardEvent>(window, 'keydown'),
			fromEvent<KeyboardEvent>(window, 'keyup'),
		).pipe(
			takeUntil(this.destroy$)
		).subscribe((e) => {
			this.keys.alt = e.altKey;
			this.keys.shift = e.shiftKey;
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.missions) {
			this.chunks = this.missions
				?.flatMap((m) => m.chunks)
				.map((c) => ({ ...c }))
				|| [];
			if (this.selected) {
				const selectedIds = this.selected.chunks.map((c) => c._id);
				this.selected.chunks = this.chunks.filter((c) => selectedIds.includes(c._id));
				if (!this.selected.chunks.length) {
					this.selected = null;
				}
				this.refreshChunks();
			}
		}
	}

	@HostListener('contextmenu', ['$event'])
	cancelSelect(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		this.updateSelected(null);
	}

	doCopy(chunk: Chunk) {
		this.chunk = {
			...chunk,
			_id: undefined
		}
	}

	doDelete(chunk: Chunk) {
		chunk.pending = true;
		this.store.dispatch(chunkActions.delete({ value: chunk }));
	}

	doUpdate(chunk: Chunk) {
		chunk.pending = true;
		this.store.dispatch(chunkActions.update({ value: chunk }));
	}

	doUpdateCount(chunk: Chunk, count: number) {
		if (chunk.count !== count && count > 0) {
			this.doUpdate({ ...chunk, count });
		}
	}

	refreshChunks() {
		if (this.selected?.date) {
			if (this.keys?.alt) {
				this.chunk = {
					date: this.selected?.date
				}
			} else if (this.keys?.shift && this.selected.chunks.length > 0) {
				console.log('debug: ', this.selected.chunks[0].date)
				this.chunk = {
					...this.selected.chunks[0],
					_id: undefined
				}
			}
			this.selectedChunks = this.selected.chunks.reduce<Record<string, Chunk[]>>((r, c) => {
				const mission = this.missions.find((m) => m._id === c.missionId)!;
				const key = mission.company!.name + ' - ' + mission.name;
				if (!r[key]) {
					r[key] = []
				}
				r[key].push(c);
				return r;
			}, {});
		} else {
			this.chunk = undefined;
		}
	}

	updateNextMonth(event?: Date) {
		this.nextMonth = getSiblingMonth(this.currentMonth);
	}

	updateSelected(selection: ChunkCalendarSelectSingle | null) {
		this.selected = selection;
		this.refreshChunks();
	}
}
