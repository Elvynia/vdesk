import {
	Args,
	Mutation,
	Query,
	Resolver
} from '@nestjs/graphql';
import { RoleCreate, RoleEntity, RoleUpdate } from './role.entity';
import { RoleService } from './role.service';

@Resolver(() => RoleEntity)
export class RoleResolver {
	constructor(private readonly roleService: RoleService) { }

	@Mutation(() => RoleEntity)
	createRole(@Args('createRoleInput') createRoleInput: RoleCreate) {
		return this.roleService.create(createRoleInput);
	}

	@Query(() => [RoleEntity], { name: 'role' })
	findAll() {
		return this.roleService.findAll();
	}

	@Query(() => RoleEntity, { name: 'roleId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.roleService.findOne(id);
	}

	@Mutation(() => RoleEntity)
	updateRole(@Args('updateRoleInput') updateRoleInput: RoleUpdate) {
		return this.roleService.update(updateRoleInput._id, updateRoleInput);
	}

	@Mutation(() => RoleEntity)
	removeRole(@Args('id', { type: () => String }) id: string) {
		return this.roleService.remove(id);
	}
}
