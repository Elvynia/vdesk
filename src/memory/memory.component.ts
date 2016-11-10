import {Component, Input} from '@angular/core';

import {Memory} from './memory.class';

@Component({
	selector: 'memory',
	templateUrl: '/views/memory.template.html'
})
export class MemoryComponent {
	@Input() memory: Memory;
	@Input() active: boolean;

	constructor() {
		this.active = false;
	}
}