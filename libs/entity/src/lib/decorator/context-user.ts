import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { GraphQLContext } from "../util/apollo/context.type";

export const ContextUser = createParamDecorator(
	(prop: string | undefined, context: ExecutionContext) => {
		const gqlContext = GqlExecutionContext.create(context).getContext<GraphQLContext>();
		return prop ? gqlContext.req.user[prop] : gqlContext.req.user;
	}
)
