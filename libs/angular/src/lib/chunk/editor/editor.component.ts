import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { Chunk, Mission } from '@lv/common';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LoadingDirective } from "../../loading/loading.directive";
import { ChunkCalendarComponent } from '../calendar/calendar.component';
import { ChunkCalendarSelectSingle } from '../calendar/calendar.type';
import { chunkActions } from '../chunk.actions';

@Component({
	selector: 'lv-chunk-editor',
	imports: [
		CommonModule,
		ChunkCalendarComponent,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatSidenavModule,
		MatSliderModule,
		LoadingDirective,
	],
	templateUrl: './editor.component.html',
	styleUrl: './editor.component.css',
})
export class ChunkEditorComponent implements OnChanges {
	@Input() missions: Mission[];
	@ViewChild('drawer') drawer?: MatDrawer;
	chunks: Chunk[];
	selected: ChunkCalendarSelectSingle | null;

	constructor(private store: Store, private actions: Actions) {
		this.chunks = [];
		this.missions = [];
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
					this.drawer?.close();
					this.selected = null;
				}
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
		this.doUpdate({ ...chunk, count });
	}

	doUpdate(chunk: Chunk) {
		chunk.pending = true;
		this.store.dispatch(chunkActions.update({ value: chunk }));
	}

	doDelete(chunk: Chunk) {
		chunk.pending = true;
		this.store.dispatch(chunkActions.delete({ value: chunk }));
	}

	updateSelected(selection: ChunkCalendarSelectSingle | null) {
		this.selected = selection;
		const hasChunks = !!selection?.chunks.length;
		if (
			this.drawer
			&& (
				hasChunks && !this.drawer.opened
				|| !hasChunks && this.drawer.opened
			)
		) {
			this.drawer.toggle();
		}
	}
}
