import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'lv-loading-placeholder',
	imports: [
		CommonModule,
		MatProgressSpinnerModule
	],
	templateUrl: './loading-placeholder.component.html',
	host: {
		class: /*tw*/ 'flex grow items-center self-center'
	}
})
export class LoadingPlaceholderComponent {
	@Input() diameter: number;
	@Input() @HostBinding('class') classes?: string[];

	constructor() {
		this.diameter = 48;
	}
}
