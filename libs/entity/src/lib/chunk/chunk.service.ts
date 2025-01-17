import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import { ChunkCreate, ChunkEntity, ChunkUpdate } from './chunk.entity';

@Injectable()
export class ChunkService extends EntityService<
	ChunkEntity,
	ChunkCreate,
	ChunkUpdate
> {
	constructor(
		@InjectModel(ChunkEntity.name)
		protected readonly model: Model<ChunkEntity>
	) {
		super();
	}
}
