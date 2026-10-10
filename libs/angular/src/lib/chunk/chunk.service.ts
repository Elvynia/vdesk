import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chunk, ChunkCreate, chunkFields, ChunkPatch } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class ChunkService extends ApiService<Chunk, ChunkCreate, ChunkPatch> {
	get entity(): string {
		return 'chunk';
	}

	constructor(httpClient: HttpClient, config: ApiConfig) {
		super(httpClient, config);
	}

	getFields(): string {
		return chunkFields.join('\n');
	}
}
