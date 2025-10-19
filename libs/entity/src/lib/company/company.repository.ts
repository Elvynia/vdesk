import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { CompanyCreate, CompanyEntity, CompanyUpdate } from './company.entity';

@Injectable()
export class CompanyRepository extends EntityRepository<
	CompanyEntity,
	CompanyCreate,
	CompanyUpdate
> {
	constructor(
		@InjectModel(CompanyEntity.name)
		protected readonly model: Model<CompanyEntity>
	) {
		super();
	}
}
