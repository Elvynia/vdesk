import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => AccountEntity)
export class AccountResolver {
	constructor(private readonly accountService: AccountService) { }

	@Mutation(() => AccountEntity)
	createAccount(@Args('createAccountInput') createAccountInput: AccountEntity) {
		return this.accountService.create(createAccountInput);
	}

	@Query(() => [AccountEntity], { name: 'account' })
	@UseGuards(AuthGuard)
	findAll() {
		return this.accountService.findAll();
	}

	@Query(() => AccountEntity, { name: 'accountId' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.accountService.findOne(id);
	}

	@Mutation(() => AccountEntity)
	updateAccount(@Args('updateAccountInput') updateAccountInput: AccountEntity) {
		return this.accountService.update(
			updateAccountInput.id,
			updateAccountInput
		);
	}

	@Mutation(() => AccountEntity)
	removeAccount(@Args('id', { type: () => Int }) id: number) {
		return this.accountService.remove(id);
	}
}
