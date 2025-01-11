import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { MappingPublic } from '../decorator/mapping-public';
import { AccountCreate, AccountEntity } from './account.entity';
import { AccountService } from './account.service';

@Resolver(() => AccountEntity)
export class AccountResolver {
	constructor(private readonly accountService: AccountService) { }

	@Mutation(() => AccountEntity)
	@MappingPublic()
	createAccount(@Args('createAccountInput') createAccountInput: AccountCreate) {
		return this.accountService.create(createAccountInput);
	}

	@Query(() => [AccountEntity], { name: 'account' })
	@UseGuards(AuthGuard)
	findAll() {
		return this.accountService.findAll();
	}

	@Query(() => AccountEntity, { name: 'accountId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.accountService.findOne(id);
	}

	@Mutation(() => AccountEntity)
	updateAccount(@Args('updateAccountInput') updateAccountInput: AccountEntity) {
		return this.accountService.update(
			updateAccountInput._id,
			updateAccountInput
		);
	}

	@Mutation(() => AccountEntity)
	removeAccount(@Args('id', { type: () => String }) id: string) {
		return this.accountService.remove(id);
	}
}
