import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'lv-loading-placeholder',
	imports: [
		CommonModule,
		MatProgressSpinnerModule
	],
	templateUrl: './loading-placeholder.component.html',
	host: {
		class: 'flex place-content-center w-full h-full'
	}
})
export class LoadingPlaceholderComponent {
	@Input() diameter: number;
	@Input() color: string;
	@Input() classes: string[];

	constructor() {
		this.diameter = 48;
		this.color = 'accent';
		this.classes = [];
	}
}
