import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ChunkCalendarComponent, ChunkFormCardComponent, ObserverCompomix } from '@lv/angular';

@Component({
	selector: 'lv-home-view',
	imports: [
		ChunkFormCardComponent,
		ChunkCalendarComponent,
		MatCardModule,
	],
	templateUrl: './view.component.html',
	styleUrl: './view.component.css',
})
export class ViewComponent extends ObserverCompomix() {

	constructor() {
		super();
	}
}
