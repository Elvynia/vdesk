import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import { RoleCreate, RoleEntity, RoleUpdate } from './role.entity';

@Injectable()
export class RoleService extends EntityService<
	RoleEntity,
	RoleCreate,
	RoleUpdate
> {
	constructor(
		@InjectModel(RoleEntity.name)
		protected readonly model: Model<RoleEntity>
	) {
		super();
	}
}
