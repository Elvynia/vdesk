import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Account.name,
				schema: AccountSchema,
				collection: 'account',
			},
		]),
	],
	providers: [AccountResolver, AccountService],
})
export class AccountModule {}
