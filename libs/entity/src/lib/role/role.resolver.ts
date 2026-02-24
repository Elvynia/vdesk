import {
    Args,
    Mutation,
    Query,
    Resolver
} from '@nestjs/graphql';
import { RoleCreateEntity, RoleEntity, RoleUpdateEntity } from './role.entity';
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
	updateRole(@Args('updateRoleInput') updateRoleInput: RoleUpdateEntity) {
		return this.roleRepository.update(updateRoleInput._id, updateRoleInput);
	}

	@Mutation(() => RoleEntity)
	removeRole(@Args('id', { type: () => String }) id: string) {
		return this.roleRepository.remove(id);
	}
}
