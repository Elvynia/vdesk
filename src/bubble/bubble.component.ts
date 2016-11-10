import {Component, Input} from '@angular/core';

import {Bubble} from './bubble.class';

@Component({
	selector: 'bubble',
	templateUrl: '/views/bubble.template.html'
})
export class BubbleComponent {
	@Input() bubble: Bubble;

	ngOnInit() {
		if (!this.bubble.position) {
			this.bubble.position = new THREE.Vector3(0, 0, 0);
		}
		if (!this.bubble.size) {
			this.bubble.size = 1;
		}
	}
}