import { IEntity } from '../util/entity.type';

export interface Role extends IEntity {
	name: string;
}

export interface RoleState {
	roles: Record<string, Role>;
}

export const selectRoles = (state: RoleState) => state.roles;
