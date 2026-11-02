import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyEntity } from '../company/company.entity';
import { EntityToManyRepository } from '../entity-to-many.repository';
import { EntityRepository } from '../entity.repository';
import { InvoiceCreateEntity, InvoiceEntity, InvoicePatchEntity } from './invoice.entity';

@Injectable()
export class InvoiceRepository extends EntityRepository<
	InvoiceEntity,
	InvoiceCreateEntity,
	InvoicePatchEntity
> implements EntityToManyRepository<
	InvoiceEntity,
	InvoiceCreateEntity,
	InvoicePatchEntity
> {

	constructor(
		@InjectModel(InvoiceEntity.name)
		protected readonly model: Model<InvoiceEntity>
	) {
		super();
	}

	countByParentIds(ids: readonly string[]) {
		const startYear = new Date();
		startYear.setMonth(0);
		startYear.setDate(1);
		return this.model.aggregate<{
			companyId: string;
			count: number;
		}>([
			{
				$match: {
					companyId: { $in: ids },
					createdOn: { $gt: startYear }
				}
			}, {
				$group: {
					_id: "$companyId",
					count: { $sum: 1 }
				}
			}, {
				$project: {
					_id: 0,
					companyId: "$_id",
					count: 1
				}
			}
		]);
	}

	findAllPending() {
		return this.findAll({
			paid: false
		});
	}

	findByParentIds(ids: readonly string[]) {
		return this.model.find({ companyId: { $in: ids } });
	}

	findOnePrint(_id: string) {
		return this.model.findOne({ _id })
			.populate([{
				path: 'company',
				populate: ['address', 'type'],
				model: CompanyEntity.name
			}])
			.orFail()
			.exec();
	}

	async isPending(_id: string) {
		return !!(await this.model
			.exists({
				_id,
				paid: false
			})
			.exec());
	}

	getYearCount(companyId: string) {
		const startYear = new Date();
		startYear.setMonth(0);
		startYear.setDate(1);
		return this.model
			.countDocuments({
				companyId,
				createdOn: { $gt: startYear }
			})
			.orFail()
			.exec();
	}
}
