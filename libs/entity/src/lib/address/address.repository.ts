import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { AddressCreateEntity, AddressEntity, AddressUpdateEntity } from './address.entity';

@Injectable()
export class AddressRepository extends EntityRepository<
	AddressEntity,
	AddressCreateEntity,
	AddressUpdateEntity
> {
	constructor(
		@InjectModel(AddressEntity.name)
		protected readonly model: Model<AddressEntity>
	) {
		super();
	}
}
