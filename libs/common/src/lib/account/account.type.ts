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
	role: Role;
}

export interface AccountState {
	accounts: Record<string, Account>;
}

export const selectAccounts = (state: AccountState) => state.accounts;
