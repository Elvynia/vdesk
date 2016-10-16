import {Component, Input, SimpleChange} from '@angular/core';

import {TgState} from 'trilliangular/core/tg-state.class';

import {Tag} from './tag.class';

@Component({
	selector: 'tag',
	templateUrl: '../views/tag.template.html'
})
export class TagComponent {
	@Input() tag: Tag;
	@Input() position: THREE.Vector2;
	@Input() scale: number;
	@Input() selected: boolean;
	mesh: THREE.Mesh;

	constructor() {
		this.tag = new Tag();
		this.position = new THREE.Vector2();
		this.scale = 50;
		this.selected = false;
	}

	private onMeshStart(state: TgState) {
		this.mesh = state.target.instance;
		this.mesh.position.x = this.position.x * this.scale;
		this.mesh.position.z = this.position.y * this.scale;
		this.mesh.position.y = this.scale / 2;
	}

	private onLightInstantiated(state: TgState) {
		let light = state.target.instance;
		light.position.x = this.position.x * this.scale;
		light.position.z = this.position.y * this.scale;
		light.position.y = this.scale * 4;
		light.target = this.mesh;
	}
}