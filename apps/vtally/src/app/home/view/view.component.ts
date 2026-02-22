import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ChunkEditorComponent, ChunkFormCardComponent, HasMissionActiveState, missionActions, ObserverCompomix, selectMissionActive } from '@lv/angular';
import { Mission } from '@lv/common';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

@Component({
	selector: 'lv-home-view',
	imports: [
		ChunkFormCardComponent,
		ChunkEditorComponent,
		MatCardModule,
	],
	templateUrl: './view.component.html',
	host: {
		class: /*tw*/ 'flex flex-col lg:flex-row h-full gap-8'
	}
})
export class ViewComponent extends ObserverCompomix() implements OnInit {
	missions: Mission[];

	constructor(
		private store: Store<HasMissionActiveState>,
	) {
		super();
		this.missions = [];
	}

	ngOnInit() {
		this.store.select(selectMissionActive).pipe(
			takeUntil(this.destroy$)
		).subscribe((missions) => {
			this.missions = Object.values(missions);
		});
		this.store.dispatch(missionActions.listenActive());
	}
}
