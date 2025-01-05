import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Account)
export class AccountResolver {
	constructor(private readonly accountService: AccountService) { }

	@Mutation(() => Account)
	createAccount(@Args('createAccountInput') createAccountInput: Account) {
		return this.accountService.create(createAccountInput);
	}

	@Query(() => [Account], { name: 'account' })
	@UseGuards(AuthGuard)
	findAll() {
		return this.accountService.findAll();
	}

	@Query(() => Account, { name: 'accountId' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.accountService.findOne(id);
	}

	@Mutation(() => Account)
	updateAccount(@Args('updateAccountInput') updateAccountInput: Account) {
		return this.accountService.update(
			updateAccountInput.id,
			updateAccountInput
		);
	}

	@Mutation(() => Account)
	removeAccount(@Args('id', { type: () => Int }) id: number) {
		return this.accountService.remove(id);
	}
}
