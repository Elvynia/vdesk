import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'lv-loading-placeholder',
	imports: [
		CommonModule,
		MatProgressSpinnerModule
	],
	templateUrl: './loading-placeholder.component.html',
	host: {
		class: /*tw*/ 'flex place-content-center w-full h-full'
	}
})
export class LoadingPlaceholderComponent implements OnChanges {
	@Input() diameter: number;
	@Input() color: string;
	@Input('classes') _classes?: string[];
	classes: string[];

	constructor() {
		this.diameter = 48;
		this.color = 'accent';
		this.classes = ['lv-' + this.color];
	}

	ngOnChanges(): void {
		this.classes = [
			...(this._classes || []),
			'lv-' + this.color
		];
	}
}
