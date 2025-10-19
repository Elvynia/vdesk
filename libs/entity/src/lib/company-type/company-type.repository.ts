import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import {
	CompanyTypeCreate,
	CompanyTypeEntity,
	CompanyTypeUpdate,
} from './company-type.entity';

@Injectable()
export class CompanyTypeRepository extends EntityRepository<
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
