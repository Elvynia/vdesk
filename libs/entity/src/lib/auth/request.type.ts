import { FastifyRequest } from "fastify";
import { Account } from "../account/account.entity";

export interface EntityRequest extends FastifyRequest {
	user: Account;
}
