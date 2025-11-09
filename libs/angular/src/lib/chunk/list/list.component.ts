import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Chunk } from '@lv/common';
import { ChunkItemComponent } from '../item/item.component';

@Component({
	selector: 'lv-chunk-list',
	imports: [ChunkItemComponent, MatListModule],
	templateUrl: './list.component.html',
	styleUrl: './list.component.css',
})
export class ChunkListComponent {
	@Input() values: Chunk[];
	@Output() delete: EventEmitter<Chunk>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Chunk>;

	constructor() {
		this.values = [];
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
