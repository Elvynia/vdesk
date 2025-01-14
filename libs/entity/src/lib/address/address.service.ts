import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import { AddressCreate, AddressEntity, AddressUpdate } from './address.entity';

@Injectable()
export class AddressService extends EntityService<
	AddressEntity,
	AddressCreate,
	AddressUpdate
> {
	constructor(
		@InjectModel(AddressEntity.name)
		protected readonly model: Model<AddressEntity>
	) {
		super();
	}
}
