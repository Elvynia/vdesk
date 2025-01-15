import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import {
	CompanyTypeCreate,
	CompanyTypeEntity,
	CompanyTypeUpdate,
} from './company-type.entity';

@Injectable()
export class CompanyTypeService extends EntityService<
	CompanyTypeEntity,
	CompanyTypeCreate,
	CompanyTypeUpdate
> {
	constructor(
		@InjectModel(CompanyTypeEntity.name)
		protected readonly model: Model<CompanyTypeEntity>
	) {
		super();
	}
}
