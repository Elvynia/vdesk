import { IEntity } from "../entity/entity.type";
import { Role } from "../role/role.type";

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
