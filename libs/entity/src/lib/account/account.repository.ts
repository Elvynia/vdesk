import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { AccountCreateEntity, AccountEntity, AccountUpdateEntity } from './account.entity';

@Injectable()
export class AccountRepository extends EntityRepository<AccountEntity, AccountCreateEntity, AccountUpdateEntity> {
	constructor(
		@InjectModel(AccountEntity.name) protected readonly model: Model<AccountEntity>
	) {
		super();
	}

	override create(editEntity: AccountCreateEntity) {
		return super.create({
			...editEntity,
			creationDate: new Date().toISOString(),
			enabled: true
		})
	}

	findByUsername(username: string) {
		return this.model.findOne({ username }).exec();
	}
}
