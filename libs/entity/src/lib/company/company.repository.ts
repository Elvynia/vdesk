import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { CompanyCreateEntity, CompanyEntity, CompanyUpdateEntity } from './company.entity';

@Injectable()
export class CompanyRepository extends EntityRepository<
	CompanyEntity,
	CompanyCreateEntity,
	CompanyUpdateEntity
> {
	constructor(
		@InjectModel(CompanyEntity.name)
		protected readonly model: Model<CompanyEntity>
	) {
		super();
	}
}
