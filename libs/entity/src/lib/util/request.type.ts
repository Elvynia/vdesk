import { FastifyRequest } from "fastify";
import { AccountEntity } from "../account/account.entity";

export interface EntityRequest extends FastifyRequest {
	// TODO: either change to AuthJwtPayload or implement fetching user in DB.
	user: AccountEntity;
}
