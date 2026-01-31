import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ChunkEditorComponent, ChunkFormCardComponent, LoadingDirective, MissionService, ObserverCompomix } from '@lv/angular';
import { Mission } from '@lv/common';
import { finalize } from 'rxjs';

@Component({
	selector: 'lv-home-view',
	imports: [
		ChunkFormCardComponent,
		ChunkEditorComponent,
		MatCardModule,
		LoadingDirective
	],
	templateUrl: './view.component.html',
	styleUrl: './view.component.css',
})
export class ViewComponent extends ObserverCompomix() implements OnInit {
	missions!: Mission[];
	pending: boolean;

	constructor(
		private missionService: MissionService,
	) {
		super();
		this.pending = true;
	}

	ngOnInit() {
		this.missionService.sendListActive().pipe(
			finalize(() => this.pending = false)
		).subscribe((missions) => {
			this.missions = missions;
		});
	}
}
