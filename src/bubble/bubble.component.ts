import {Component, Input, DoCheck, OnChanges, SimpleChange} from '@angular/core';

import {TgInstance, TrilliangularService} from '@trilliangular/core';
import {TgMouseService} from '@trilliangular/inputs';
import {ThreeRenderer} from '@trilliangular/runtime-three';

import {Bubble} from './bubble.class';

@Component({
	selector: 'bubble',
	templateUrl: '/views/bubble.template.html',
	styleUrls: ['../css/bubble.css']
})
export class BubbleComponent implements DoCheck, OnChanges {
	@Input() bubble: Bubble;
	private viewPosition: THREE.Vector2;
	private cameraPos: THREE.Vector3;

	private get camera(): THREE.Camera {
		return (<ThreeRenderer> this.appService.state.renderer).camera;
	}

	constructor(private appService: TrilliangularService) {
		this.viewPosition = new THREE.Vector2();
		this.cameraPos = new THREE.Vector3();
	}

	ngDoCheck() {
		if (this.camera && this.camera.position.distanceTo(this.cameraPos) > 0) {
			this.cameraPos.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
			this.recalculateView();
		}
	}

	ngOnChanges(changes: {[key: string]: SimpleChange}) {
		if (this.bubble) {
			if (!this.bubble.position) {
				this.bubble.position = new THREE.Vector3(0, 0, 0);
			}
			if (!this.bubble.size) {
				this.bubble.size = 1;
			}
			this.recalculateView();
		}
	}

	private buildLine(state: TgInstance) {
		let geom:THREE.Geometry = state.instance;
		geom.vertices.push(this.bubble.position, this.bubble.parent.position);
	}

	private recalculateView() {
		let pos: THREE.Vector3 = new THREE.Vector3(this.bubble.position.x, this.bubble.position.y, this.bubble.position.z);
		let widthHalf = this.appService.state.width / 2;
		let heightHalf = this.appService.state.height / 2;
		pos.project(this.camera);
		this.viewPosition.x = ( pos.x * widthHalf ) + widthHalf;
		this.viewPosition.y = - ( pos.y * heightHalf ) + heightHalf;
	}
}