import { AuthJwtPayload } from "@lv/common";
import { FastifyRequest } from "fastify";
import { WSContext } from "./apollo/context.type";

export interface EntityRequest extends FastifyRequest {
	connectionParams: WSContext['connectionParams'];
	extra: any
	user: AuthJwtPayload;
}
