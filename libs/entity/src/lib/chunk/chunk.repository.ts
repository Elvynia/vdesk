import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { ChunkCreate, ChunkEntity, ChunkUpdate } from './chunk.entity';

@Injectable()
export class ChunkRepository extends EntityRepository<
	ChunkEntity,
	ChunkCreate,
	ChunkUpdate
> {
	constructor(
		@InjectModel(ChunkEntity.name)
		protected readonly model: Model<ChunkEntity>
	) {
		super();
	}

	findByMission(missionId: string) {
		return this.model.find({ missionId });
	}

	markInvoiced(ids: string[], invoiced: boolean) {
		return this.model.updateMany({
			_id: { $in: ids }
		}, {
			invoiced
		}).exec();
	}

	markPaid(ids: string[], paid: boolean) {
		return this.model.updateMany({
			_id: { $in: ids }
		}, {
			paid
		}).exec();
	}
}
