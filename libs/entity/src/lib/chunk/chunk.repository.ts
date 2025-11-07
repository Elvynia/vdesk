import { Chunk } from '@lv/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { ChunkCreate, ChunkEntity, ChunkUpdate } from './chunk.entity';

@Injectable()
export class ChunkRepository extends EntityRepository<
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

	findByMission(missionId: string, active?: boolean) {
		const args = { missionId } as Chunk;
		if (active) {
			args.invoiced = !active;
		}
		return this.model.find(args);
	}
}
