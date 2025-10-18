import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import { MissionCreate, MissionEntity, MissionUpdate } from './mission.entity';
import { ChunkEntity } from '../chunk/chunk.entity';

@Injectable()
export class MissionService extends EntityService<
	MissionEntity,
	MissionCreate,
	MissionUpdate
> {
	constructor(
		@InjectModel(MissionEntity.name)
		protected readonly model: Model<MissionEntity>
	) {
		super();
	}

	// override findAll(): Promise<MissionEntity[]> {
	// 	return this.model.find().populate('chunks', null, ChunkEntity.name).exec().then((c) => { console.log(c); return c });
	// }
}
