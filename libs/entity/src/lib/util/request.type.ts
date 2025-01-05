import { FastifyRequest } from "fastify";
import { AccountEntity } from "../account/account.entity";

export interface EntityRequest extends FastifyRequest {
	user: AccountEntity;
}
