import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleCreateEntity, RoleEntity, RolePatchEntity } from './role.entity';
import { RoleRepository } from './role.repository';

@Resolver(() => RoleEntity)
export class RoleResolver {
	constructor(private readonly roleRepository: RoleRepository) { }

	@Mutation(() => RoleEntity)
	createRole(@Args('createRoleInput') createRoleInput: RoleCreateEntity) {
		return this.roleRepository.create(createRoleInput);
	}

	@Query(() => [RoleEntity], { name: 'role' })
	findAll() {
		return this.roleRepository.findAll();
	}

	@Query(() => RoleEntity, { name: 'roleId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.roleRepository.findOne(id);
	}

	@Mutation(() => RoleEntity)
	patchRole(@Args('patchRoleInput') patchRoleInput: RolePatchEntity) {
		return this.roleRepository.patch(patchRoleInput._id, patchRoleInput);
	}

	@Mutation(() => RoleEntity)
	removeRole(@Args('id', { type: () => String }) id: string) {
		return this.roleRepository.remove(id);
	}
}
