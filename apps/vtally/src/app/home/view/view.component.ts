import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ChunkEditorComponent, ChunkFormCardComponent, MissionService, ObserverCompomix } from '@lv/angular';
import { Mission } from '@lv/common';
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
		class: 'flex flex-col lg:flex-row h-full gap-8'
	}
})
export class ViewComponent extends ObserverCompomix() implements OnInit {
	missions: Mission[];

	constructor(
		private missionService: MissionService,
	) {
		super();
		this.missions = [];
	}

	ngOnInit() {
		this.missionService.listenActive().pipe(
			takeUntil(this.destroy$)
		).subscribe((missions) => {
			this.missions = missions;
		});
	}
}
