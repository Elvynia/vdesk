import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { ChunkFormCardComponent, ObserverCompomix } from '@lv/angular';

@Component({
	selector: 'lv-home-view',
	imports: [
		ChunkFormCardComponent,
		MatCardModule
	],
	templateUrl: './view.component.html',
	styleUrl: './view.component.css',
})
export class ViewComponent extends ObserverCompomix() {

	constructor() {
		super();
	}
}
