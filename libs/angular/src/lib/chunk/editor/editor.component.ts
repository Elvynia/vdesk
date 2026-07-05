import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { Chunk, Mission } from '@lv/common';
import { Store } from '@ngrx/store';
import { LoadingDirective } from "../../loading/loading.directive";
import { ChunkCalendarComponent } from '../calendar/calendar.component';
import { ChunkCalendarSelectSingle } from '../calendar/calendar.type';
import { chunkActions } from '../chunk.actions';
import { ChunkFormCardComponent } from '../form-card/form-card.component';

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
export class ChunkEditorComponent implements OnChanges {
	@Input() missions: Mission[];
	chunk?: Partial<Chunk>;
	chunks: Chunk[];
	lastMonth: Date;
	selected: ChunkCalendarSelectSingle | null;
	selectedChunks?: Record<string, Chunk[]>;

	constructor(
		private store: Store
	) {
		this.chunks = [];
		this.missions = [];
		const now = new Date();
		this.lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		this.selected = null;
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

	doUpdateCount(chunk: Chunk, count: number) {
		if (chunk.count !== count && count > 0) {
			this.doUpdate({ ...chunk, count });
		}
	}

	doUpdate(chunk: Chunk) {
		chunk.pending = true;
		this.store.dispatch(chunkActions.update({ value: chunk }));
	}

	doDelete(chunk: Chunk) {
		chunk.pending = true;
		this.store.dispatch(chunkActions.delete({ value: chunk }));
	}

	refreshChunks() {
		if (this.selected?.date) {
			this.chunk = {
				date: this.selected?.date
			}
			this.selectedChunks = this.selected.chunks.reduce<Record<string, Chunk[]>>((r, c) => {
				const mission = this.missions.find((m) => m._id === c.missionId)!;
				if (!r[mission.name]) {
					r[mission.name] = []
				}
				r[mission.name].push(c);
				return r;
			}, {});
		} else {
			this.chunk = undefined;
		}
	}

	updateSelected(selection: ChunkCalendarSelectSingle | null) {
		this.selected = selection;
		this.refreshChunks();
	}
}
