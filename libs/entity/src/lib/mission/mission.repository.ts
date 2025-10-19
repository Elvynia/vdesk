import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { MissionCreate, MissionEntity, MissionUpdate } from './mission.entity';

@Injectable()
export class MissionRepository extends EntityRepository<
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
}
