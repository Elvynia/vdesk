import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { MissionCreate, MissionEntity, MissionUpdate } from './mission.entity';

@Injectable()
export class MissionRepository extends EntityRepository<
	MissionEntity,
	MissionCreate,
	MissionUpdate
> {
	constructor(
		@InjectModel(MissionEntity.name)
		protected readonly model: Model<MissionEntity>,
	) {
		super();
	}

	findByCompany(companyId: string) {
		return this.model.find({ companyId });
	}

	isActive(id: string, date: Date = new Date()) {
		return this.model.exists({
			id,
			start: { $lt: date },
			$or: [{
				end: {
					$eq: null
				}
			}, {
				end: {
					$gt: date
				}
			}]
		});
	}

	findAllActive(date: Date = new Date()) {
		return this.findAll({
			start: { $lt: date },
			$or: [{
				end: {
					$eq: null
				}
			}, {
				end: {
					$gt: date
				}
			}]
		});
	}
}
