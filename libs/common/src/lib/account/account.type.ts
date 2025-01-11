import { IEntity } from "../entity/entity.type";

export interface Account extends IEntity {
	creationDate: string;
	email: string;
	enabled: boolean;
	lastLogon: string;
	password?: string;
	username: string;
	verified: boolean;
}

export interface AccountState {
	accounts: Record<string, Account>;
}

export const selectAccounts = (state: AccountState) => state.accounts;
