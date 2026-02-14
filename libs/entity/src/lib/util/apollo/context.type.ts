import { BaseContext } from "@apollo/server";
import { FastifyReply } from "fastify";
import type { Context } from 'graphql-ws';
import { EntityRequest } from "../request.type";

export type WSContext = Context<{
	authorization?: string;
}, any>;

export interface GraphQLContext extends BaseContext {
	req: EntityRequest;
	reply: FastifyReply;
}
