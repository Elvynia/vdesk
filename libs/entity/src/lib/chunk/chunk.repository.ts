import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityToManyRepository } from '../entity-to-many.repository';
import { EntityRepository } from '../entity.repository';
import { ChunkCreateEntity, ChunkEntity, ChunkPatchEntity } from './chunk.entity';

@Injectable()
export class ChunkRepository extends EntityRepository<
	ChunkEntity,
	ChunkCreateEntity,
	ChunkPatchEntity
> implements EntityToManyRepository<ChunkEntity> {
	constructor(
		@InjectModel(ChunkEntity.name)
		protected readonly model: Model<ChunkEntity>
	) {
		super();
	}

	findByParentIds(missionIds: readonly string[]) {
		return this.model.find({ missionId: { $in: missionIds.slice() } });
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
