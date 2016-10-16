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
import {Memory} from '../memory/memory.class';
import {Tag} from '../tag/tag.class';
import {Ramm} from './ramm.class';

@Component({
	selector: 'ramm',
	templateUrl: '../views/ramm.template.html',
	styleUrls: ['../css/ramm.css'],
	providers: [TrilliangularService, TgMouselistenerService, RammService]
})
export class RammComponent implements OnInit, DoCheck {
	private showInputs: boolean;
	private cameraControls: boolean;
	private memory: Memory;
	private tag: Tag;
	private memoryMap: Ramm;
	private displaySize = {
		x: window.innerWidth,
		y: window.innerHeight
	};
	private tagScale: number;
	private mousePosition: THREE.Vector2;
	private hoverTag: Tag;
	private selectedTags: Array<Tag>;
	@ViewChild('renderer') renderer: TgRendererComponent;
	@ViewChild('plane') plane: TgInstanceComponent;
	@ViewChild('tags') tags: TgActorComponent;
	
	constructor(private mouseService: TgMouselistenerService, private rammService: RammService) {
		this.showInputs = false;
		this.cameraControls = false;
		this.memory = new Memory();
		this.tag = null;
		this.memoryMap = new Ramm();
		this.tagScale = 50;
		this.mousePosition = new THREE.Vector2();
		this.hoverTag = null;
		this.selectedTags = new Array<Tag>();
	}

	ngOnInit() {
		this.mouseService.initialize(document.getElementsByTagName("canvas")[0]);
		this.mouseService.events
			.filter((event) => event.type === MOUSE.CLICKED || event.type === MOUSE.DOUBLE_CLICKED)
			.debounceTime(200)
			.subscribe((event) => {
				if (event.type === MOUSE.CLICKED) {
					this.selectTag(event);
				} else {
					this.editTag(event);
				}
			});
		this.rammService.events.subscribe((ramm:Ramm) => {
			this.memoryMap = ramm;
			console.debug('Memory map updated !');
		});
		window.addEventListener("resize", () => {
			this.displaySize = {
				x: window.innerWidth,
				y: window.innerHeight
			}
		});
	}

	ngDoCheck() {
		if (this.renderer.cameraInstance) {
			this.cameraControls = true;
		} else {
			this.cameraControls = false;
		}
	}

	private addMemory() {
		if (this.selectedTags.length > 0) {
			this.selectedTags.forEach((tag) => this.memory.tags.push(tag));
		} else {
			this.memory.tags = undefined;
		}
		this.rammService.addMemory(this.memory);
		this.memory = new Memory();
	}

	private saveTag() {
		if (this.tag._id) {
			this.rammService.editTag(this.tag);
		} else {
			this.rammService.addTag(this.tag);
		}
		this.tag = null;
	}

	private start(state: TgContainer) {
		this.plane.instance.rotation.x = -Math.PI / 2;
		let camera:THREE.PerspectiveCamera = state.target.renderer.camera;
		camera.position.set(500, 800, 1300);
		camera.lookAt(new THREE.Vector3());
	}

	private editTag(listener: TgMouselistener) {
		let editTag = this.selectTag(listener);
		if (editTag) {
			// Modify an existing tag.
			this.tag = editTag;
		} else {
			// Check if clicked on the tag plane.
			let x = listener.nativeEvent.clientX;
			let y = listener.nativeEvent.clientY;
			let planeIntersects = this.mouseService.mouseSelectObject(x, y, this.plane.instance);
			if (planeIntersects.length > 0) {
				// Create a new tag.
				this.tag = new Tag("");
			}
		}
	}

	private selectTag(listener: TgMouselistener): Tag {
		let x = listener.nativeEvent.clientX;
		let y = listener.nativeEvent.clientY;
		let tag: Tag = this.projectOnTag(x, y);
		if (tag) {
			let index = this.selectedTags.indexOf(tag);
			if (index < 0) {
				// Add to selection.
				this.selectedTags.push(tag);
			} else {
				// Unselect.
				this.selectedTags.splice(index, 1);
			}
		}
		return tag;
	}

	private update(delta: number) {
		let newPos = this.mouseService.mousePosition;
		if (newPos && (newPos.x !== this.mousePosition.x || newPos.y !== this.mousePosition.y)) {
			this.mousePosition.x = newPos.x;
			this.mousePosition.y = newPos.y;
			this.hoverTag = this.projectOnTag(this.mousePosition.x, this.mousePosition.y);
		}
	}

	private projectOnTag(x: number, y: number): Tag {
		let result = null;
		let intersections = this.mouseService.mouseSelect(x, y);
		if (intersections.length > 0 && intersections[0].object !== this.plane.instance) {
			let target:any = intersections[0].object;
			for (var i = this.tags.objects.length - 1; i >= 0; i--) {
				if (target === this.tags.objects[i].instance) {
					result = this.memoryMap.getTagById(target.name);
					break;
				}
			}
		}
		return result;
	}

}