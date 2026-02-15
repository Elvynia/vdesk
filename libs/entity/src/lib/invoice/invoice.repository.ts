import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyEntity } from '../company/company.entity';
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

	findOnePrint(_id: string) {
		return this.model.findOne({ _id })
			.populate([{
				path: 'company',
				populate: ['address', 'type'],
				model: CompanyEntity.name
			}])
			.exec();
	}

	getYearCount(companyId: string) {
		const startYear = new Date();
		startYear.setMonth(0);
		startYear.setDate(1);
		return this.model.countDocuments({
			companyId,
			createdOn: { $gt: startYear }
		});
	}
}
