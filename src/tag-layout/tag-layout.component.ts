import {Component, Input, Output, EventEmitter, ViewChild, OnInit} from '@angular/core';

import {TgState} from '@trilliangular/core';
import {MOUSE, TgMouse, TgMouseService} from '@trilliangular/inputs';
import {ThreeInstanceComponent, ThreeMouseService} from '@trilliangular/runtime-three';

import {RammService} from '../ramm/ramm.service';
import {Tag} from '../tag/tag.class';
import {TagService} from '../tag/tag.service';

@Component({
	selector: 'tag-layout',
	templateUrl: '../views/tag-layout.template.html',
	styleUrls: ['../css/tag-layout.css'],
	providers: [ThreeMouseService, {provide: TgMouseService, useExisting: ThreeMouseService}]
})
export class TagLayoutComponent implements OnInit {
	@Input() tags: Array<Tag>;
	@Output() tagSelected: EventEmitter<[Tag, boolean]>;
	@Output() tagHovered: EventEmitter<[Tag, boolean]>;
	@ViewChild('plane') plane: ThreeInstanceComponent;
	private editing: Tag;
	private hovering: Tag;
	private selectedTags: Array<Tag>;

	constructor(private mouseService: ThreeMouseService, private tagService: TagService) {
		this.tagSelected = new EventEmitter<[Tag, boolean]>();
		this.tagHovered = new EventEmitter<[Tag, boolean]>();
		this.editing = null;
		this.hovering = null;
		this.selectedTags = new Array<Tag>();
	}

	ngOnInit() {
		this.mouseService.initialize(document.getElementsByTagName("canvas")[0]);
		this.mouseService.events
			.filter((event:TgMouse) => event.type === MOUSE.CLICKED || event.type === MOUSE.DOUBLE_CLICKED)
			.debounceTime(200)
			.subscribe((event:TgMouse) => {
				if (event.type === MOUSE.CLICKED
					&& event.nativeEvent.button == 0) {
					this.selectTag(event);
				} else {
					// TODO: Enter the tag !
				}
			});
		this.mouseService
			.eventsByType(MOUSE.MOVED)
			.subscribe((event:TgMouse) => {
				let oldValue = this.hovering;
				this.hovering = this.projectOnTag(event.nativeEvent.clientX, event.nativeEvent.clientY);
				if (this.hovering !== oldValue) {
					this.tagHovered.next([this.hovering || oldValue, this.hovering !== null]);
				}
			});
		this.mouseService
			.eventsByType(MOUSE.CONTEXT_MENU)
			.subscribe((event:TgMouse) => {
				this.editTag(event);
				event.nativeEvent.preventDefault();
			});
	}

	private saveTag() {
		if (this.editing.id) {
			this.tagService.update(this.editing);
		} else {
			this.tagService.create(this.editing);
		}
		this.editing = null;
	}

	private deleteTag() {
		if (this.editing.id) {
			this.tagService.delete(this.editing).subscribe({
				complete: () => {
					let index = this.selectedTags.indexOf(this.editing);
					if (index >= 0) {
						this.selectedTags.splice(index, 1);
					}
				}
			});
		}
		this.editing = null;
	}

	private startTagPlane(state: TgState) {
		this.plane.instance.rotation.x = -Math.PI / 2;
	}

	private editTag(listener: TgMouse) {
		let x = listener.nativeEvent.clientX;
		let y = listener.nativeEvent.clientY;
		let editTag: Tag = this.projectOnTag(x, y);
		if (editTag) {
			// Modify an existing tag.
			this.editing = editTag;
		} else {
			// Check if clicked on the tag plane.
			let x = listener.nativeEvent.clientX;
			let y = listener.nativeEvent.clientY;
			let planeIntersects = this.mouseService.mouseSelectObject(x, y, this.plane.instance);
			if (planeIntersects.length > 0) {
				// Create a new tag.
				this.editing = new Tag("");
			}
		}
	}

	private selectTag(listener: TgMouse) {
		let x = listener.nativeEvent.clientX;
		let y = listener.nativeEvent.clientY;
		let tag: Tag = this.projectOnTag(x, y);
		if (tag) {
			let index = this.selectedTags.indexOf(tag);
			if (index < 0) {
				// Add to selection.
				this.selectedTags.push(tag);
				this.tagSelected.next([tag, true]);
			} else {
				// Unselect.
				this.selectedTags.splice(index, 1);
				this.tagSelected.next([tag, false]);
			}
		}
	}

	private projectOnTag(x: number, y: number): Tag {
		let result = null;
		let intersections = this.mouseService.mouseSelect(x, y);
		if (intersections.length > 0 && intersections[0].object !== this.plane.instance) {
			result = this.getTagById(intersections[0].object.name);
		}
		return result;
	}

	private getTagById(id: string): Tag {
		let result = null;
		for (var i = this.tags.length - 1; i >= 0; i--) {
			if (this.tags[i].id === id) {
				result = this.tags[i];
				break;
			}
		}
		return result;
	}
}