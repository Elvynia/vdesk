import { Role } from "../role/role.type";
import { IEntity } from "../util/entity.type";

export interface Account extends IEntity {
	creationDate: string;
	email: string;
	enabled: boolean;
	lastLogon: string;
	password?: string;
	username: string;
	verified: boolean;
	roleId: string;
	role?: Role;
}

export type AccountCreate = Pick<Account, 'username' | 'password' | 'email' | 'enabled' | 'roleId'>;
export type AccountPatch = Partial<Pick<Account, 'username' | 'email' | 'enabled' | 'roleId'>> & IEntity;

export interface AccountState {
	accounts: Record<string, Account>;
}

export const selectAccounts = (state: AccountState) => state.accounts;
