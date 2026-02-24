import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import {
	CompanyTypeCreateEntity,
	CompanyTypeEntity,
	CompanyTypeUpdateEntity,
} from './company-type.entity';

@Injectable()
export class CompanyTypeRepository extends EntityRepository<
	CompanyTypeEntity,
	CompanyTypeCreateEntity,
	CompanyTypeUpdateEntity
> {
	constructor(
		@InjectModel(CompanyTypeEntity.name)
		protected readonly model: Model<CompanyTypeEntity>
	) {
		super();
	}
}
