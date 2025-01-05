import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService extends EntityService<AccountEntity> {
	constructor(
		@InjectModel(AccountEntity.name) protected readonly model: Model<AccountEntity>
	) {
		super();
	}

	findByUsername(username: string) {
		return this.model.findOne({ username }).exec();
	}
}
