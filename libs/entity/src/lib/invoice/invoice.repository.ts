import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { InvoiceCreate, InvoiceEntity, InvoiceUpdate } from './invoice.entity';

@Injectable()
export class InvoiceRepository extends EntityRepository<
	InvoiceEntity,
	InvoiceCreate,
	InvoiceUpdate
> {
	constructor(
		@InjectModel(InvoiceEntity.name)
		protected readonly model: Model<InvoiceEntity>
	) {
		super();
	}

	getYearCount(companyId: string) {
		const startYear = new Date();
		startYear.setMonth(0);
		startYear.setDate(0);
		return this.model.countDocuments({
			companyId,
			date: { $gt: startYear }
		});
	}
}
