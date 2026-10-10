import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { AuthGuard } from '../auth/auth.guard';
import { MappingPublic } from '../decorator/mapping-public';
import { RoleEntity } from '../role/role.entity';
import { RoleLoader } from '../role/role.loader';
import { RoleRepository } from '../role/role.repository';
import { AccountCreateEntity, AccountEntity, AccountPatchEntity } from './account.entity';
import { AccountRepository } from './account.repository';

@Resolver(() => AccountEntity)
export class AccountResolver {
	constructor(private readonly accountRepository: AccountRepository,
		private readonly roleRepository: RoleRepository
	) { }

	@Mutation(() => AccountEntity)
	@MappingPublic()
	createAccount(@Args('createAccountInput') createAccountInput: AccountCreateEntity) {
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
	patchAccount(@Args('patchAccountInput') patchAccountInput: AccountPatchEntity) {
		return this.accountRepository.patch(
			patchAccountInput._id,
			patchAccountInput
		);
	}

	@Mutation(() => AccountEntity)
	removeAccount(@Args('id', { type: () => String }) id: string) {
		return this.accountRepository.remove(id);
	}

	@ResolveField(() => RoleEntity)
	role(
		@Parent() parent: AccountEntity,
		@Loader(RoleLoader) loader: DataLoader<string, RoleEntity>
	) {
		return loader.load(parent.roleId);
	}
}
