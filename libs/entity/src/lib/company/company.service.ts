import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import { CompanyCreate, CompanyEntity, CompanyUpdate } from './company.entity';

@Injectable()
export class CompanyService extends EntityService<
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
