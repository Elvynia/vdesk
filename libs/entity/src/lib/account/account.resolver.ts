import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Account } from './account.entity';

@Resolver(() => Account)
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Mutation(() => Account)
	createAccount(@Args('createAccountInput') createAccountInput: Account) {
		return this.accountService.create(createAccountInput);
	}

	@Query(() => [Account], { name: 'account' })
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
			updateAccountInput._id,
			updateAccountInput
		);
	}

	@Mutation(() => Account)
	removeAccount(@Args('id', { type: () => Int }) id: number) {
		return this.accountService.remove(id);
	}
}
