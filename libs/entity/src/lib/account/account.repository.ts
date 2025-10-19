import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { AccountCreate, AccountEntity, AccountUpdate } from './account.entity';

@Injectable()
export class AccountRepository extends EntityRepository<AccountEntity, AccountCreate, AccountUpdate> {
	constructor(
		@InjectModel(AccountEntity.name) protected readonly model: Model<AccountEntity>
	) {
		super();
	}

	override create(editEntity: AccountCreate) {
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
