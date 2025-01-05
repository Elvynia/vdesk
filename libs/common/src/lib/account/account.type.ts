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
