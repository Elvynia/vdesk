import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { MissionCreateEntity, MissionEntity, MissionUpdateEntity } from './mission.entity';

@Injectable()
export class MissionRepository extends EntityRepository<
	MissionEntity,
	MissionCreateEntity,
	MissionUpdateEntity
> {
	constructor(
		@InjectModel(MissionEntity.name)
		protected readonly model: Model<MissionEntity>,
	) {
		super();
	}

	findByCompany(companyId: string) {
		return this.model.find({
			companyId
		}).exec();
	}

	isActive(_id: string, date: Date = new Date()) {
		return this.model
			.exists({
				_id,
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
			})
			.orFail()
			.exec();
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
