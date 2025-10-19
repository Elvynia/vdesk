import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { MappingPublic } from '../decorator/mapping-public';
import { RoleEntity } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';
import { AccountCreate, AccountEntity, AccountUpdate } from './account.entity';
import { AccountRepository } from './account.repository';

@Resolver(() => AccountEntity)
export class AccountResolver {
	constructor(private readonly accountRepository: AccountRepository,
		private readonly roleRepository: RoleRepository
	) { }

	@Mutation(() => AccountEntity)
	@MappingPublic()
	createAccount(@Args('createAccountInput') createAccountInput: AccountCreate) {
		return this.accountRepository.create(createAccountInput);
	}

	@Query(() => [AccountEntity], { name: 'account' })
	@UseGuards(AuthGuard)
	findAll() {
		return this.accountRepository.findAll();
	}

	@Query(() => AccountEntity, { name: 'accountId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.accountRepository.findOne(id);
	}

	@Mutation(() => AccountEntity)
	updateAccount(@Args('updateAccountInput') updateAccountInput: AccountUpdate) {
		return this.accountRepository.update(
			updateAccountInput._id,
			updateAccountInput
		);
	}

	@Mutation(() => AccountEntity)
	removeAccount(@Args('id', { type: () => String }) id: string) {
		return this.accountRepository.remove(id);
	}

	@ResolveField(() => RoleEntity)
	async role(@Parent() parent: AccountEntity) {
		return await this.roleRepository.findOne(parent.role as any);
	}
}
