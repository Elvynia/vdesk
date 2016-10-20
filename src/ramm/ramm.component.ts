import {Component, ViewChild, OnInit, DoCheck} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {TgContainer} from 'trilliangular/core/tg-container.class';
import {TgActorComponent} from 'trilliangular/core/tg-actor.component';
import {TrilliangularService} from 'trilliangular/app/trilliangular.service';
import {MOUSE} from 'trilliangular/inputs/tg-mouse.enum';
import {TgMouselistener} from 'trilliangular/inputs/tg-mouselistener.class';
import {TgMouselistenerService} from 'trilliangular/inputs/tg-mouselistener.service';
import {TgInstanceComponent} from 'trilliangular/runtime/three/tg-instance.component';
import {TgRendererComponent} from 'trilliangular/runtime/three/tg-renderer.component';

import {RammService} from './ramm.service';
import {Ramm} from './ramm.class';
import {Memory} from '../memory/memory.class';
import {MemoryService} from '../memory/memory.service';
import {Tag} from '../tag/tag.class';
import {TagService} from '../tag/tag.service';

@Component({
	selector: 'ramm',
	templateUrl: '../views/ramm.template.html',
	styleUrls: ['../css/ramm.css'],
	providers: [TrilliangularService, TgMouselistenerService, MemoryService, TagService, RammService]
})
export class RammComponent implements OnInit, DoCheck {
	private cameraControls: boolean;
	private memoryMap: Ramm;
	private selectedTags: Array<Tag>;
	private displaySize = {
		x: window.innerWidth,
		y: window.innerHeight
	};
	@ViewChild('renderer') renderer: TgRendererComponent;
	
	constructor(private mouseService: TgMouselistenerService, private rammService: RammService) {
		this.cameraControls = false;
		this.memoryMap = new Ramm();
		this.selectedTags = new Array<Tag>();
	}

	ngOnInit() {
		this.mouseService.initialize(document.getElementsByTagName("canvas")[0]);
		this.rammService.changes.subscribe((ramm:Ramm) => {
			this.memoryMap = ramm;
			console.debug('Memory map updated !');
		});
		window.addEventListener("resize", () => {
			this.displaySize = {
				x: window.innerWidth,
				y: window.innerHeight
			}
		});
		this.rammService.getMemories();
		this.rammService.getTags();
	}

	ngDoCheck() {
		if (this.renderer.cameraInstance) {
			this.cameraControls = true;
		} else {
			this.cameraControls = false;
		}
	}

	private updateMemoryTags(selection: [Tag, boolean]) {
		if (selection[1]) {
			this.selectedTags.push(selection[0]);
		} else {
			this.selectedTags.splice(this.selectedTags.indexOf(selection[0]), 1);
		}
	}

	private start(state: TgContainer) {
		let camera:THREE.PerspectiveCamera = state.target.renderer.camera;
		camera.position.set(500, 800, 1300);
		camera.lookAt(new THREE.Vector3());
	}

}