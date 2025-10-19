import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { RoleCreate, RoleEntity, RoleUpdate } from './role.entity';

@Injectable()
export class RoleRepository extends EntityRepository<
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
