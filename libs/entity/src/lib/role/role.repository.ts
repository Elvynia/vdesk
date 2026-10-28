import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { RoleCreateEntity, RoleEntity, RolePatchEntity } from './role.entity';

@Injectable()
export class RoleRepository extends EntityRepository<
	RoleEntity,
	RoleCreateEntity,
	RolePatchEntity
> {
	constructor(
		@InjectModel(RoleEntity.name)
		protected readonly model: Model<RoleEntity>
	) {
		super();
	}
}
