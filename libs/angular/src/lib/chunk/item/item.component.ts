
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Chunk } from '@lv/common';
import { LoadingPlaceholderComponent } from '../../loading/placeholder/loading-placeholder.component';
import { HoverableCompomix } from '../../util/mixins/hoverable.compomix';

@Component({
	selector: 'lv-chunk-item',
	imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    LoadingPlaceholderComponent
],
	templateUrl: './item.component.html',
	styleUrl: './item.component.css',
})
export class ChunkItemComponent extends HoverableCompomix() {
	@Input() value!: Chunk;
	@Output() delete: EventEmitter<Chunk>;
	@Output() detail: EventEmitter<string>;
	@Output() edit: EventEmitter<Chunk>;

	constructor() {
		super();
		this.delete = new EventEmitter();
		this.detail = new EventEmitter();
		this.edit = new EventEmitter();
	}
}
