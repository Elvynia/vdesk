import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityService } from '../entity.service';
import { Account } from './account.entity';

@Injectable()
export class AccountService extends EntityService<Account> {
	constructor(
		@InjectModel(Account.name) protected readonly model: Model<Account>
	) {
		super();
	}

	findByUsername(username: string) {
		return this.model.findOne({ username }).exec();
	}
}
