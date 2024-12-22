import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import { Address } from './address.entity';

@Injectable()
export class AddressService extends EntityService<Address> {

	constructor(@InjectModel(Address.name) protected readonly model: Model<Address>) {
		super();
	}

}
