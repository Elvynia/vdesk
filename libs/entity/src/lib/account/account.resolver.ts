import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { MappingPublic } from '../decorator/mapping-public';
import { RoleEntity } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { AccountCreate, AccountEntity, AccountUpdate } from './account.entity';
import { AccountService } from './account.service';

@Resolver(() => AccountEntity)
export class AccountResolver {
	constructor(private readonly accountService: AccountService,
		private readonly roleService: RoleService
	) { }

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
	updateAccount(@Args('updateAccountInput') updateAccountInput: AccountUpdate) {
		return this.accountService.update(
			updateAccountInput._id,
			updateAccountInput
		);
	}

	@Mutation(() => AccountEntity)
	removeAccount(@Args('id', { type: () => String }) id: string) {
		return this.accountService.remove(id);
	}

	@ResolveField(() => RoleEntity)
	async role(@Parent() parent: AccountEntity) {
		return await firstValueFrom(this.roleService.findOne(parent.role as any));
	}
}
