import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import { MissionCreate, MissionEntity, MissionUpdate } from './mission.entity';

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
}
