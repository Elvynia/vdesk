import {Component, Input, OnInit} from '@angular/core';

import {RammService} from '../ramm/ramm.service';
import {Memory} from '../memory/memory.class';
import {Tag} from '../tag/tag.class';

@Component({
	selector: 'memory-layout',
	templateUrl: '../views/memory-layout.template.html',
	styleUrls: ['../css/memory-layout.css']
})
export class MemoryLayoutComponent implements OnInit {
	@Input() memories: Array<Memory>;
	@Input() linkedTags: Array<Tag>;
	private editing: Memory;
	private showInputs: boolean;

	constructor(private rammService: RammService) {
		this.editing = new Memory();
		this.showInputs = false;
	}

	ngOnInit() {

	}

	private addMemory() {
		if (this.editing.tags.length === 0) {
			this.editing.tags = undefined;
		}
		this.rammService.addMemory(this.editing);
		this.editing = new Memory();
	}
}