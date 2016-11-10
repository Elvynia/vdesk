import {Component, Input, SimpleChange} from '@angular/core';

import {Bubble} from '../bubble/bubble.class';
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

	ngOnChanges(changes: {[key: string]: SimpleChange}) {
		if (changes['memory'] && this.memory) {
			this.memory.children.forEach((child:Bubble) => child.parent = this.memory.root);
		}
	}
}