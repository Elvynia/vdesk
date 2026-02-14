import { isEnvDev } from '@lv/common';
import {
	CanActivate,
	ExecutionContext,
	Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { isJWT } from 'class-validator';
import { MappingPublicKey } from '../decorator/mapping-public';
import { GraphQLContext } from '../util/apollo/context.type';
import { EntityRequest } from '../util/request.type';
import { AuthResolver } from './auth.resolver';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private readonly reflector: Reflector,
		private readonly authResolver: AuthResolver,
	) { }

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(MappingPublicKey, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) return true;

		const gqlContext = GqlExecutionContext.create(context).getContext<GraphQLContext>();
		if (gqlContext.req.connectionParams && gqlContext.req.extra.user.acc) {
			gqlContext.req.user = gqlContext.req.extra.user;
			return true;
		} else if (gqlContext.req) {
			const req = gqlContext?.req;
			// FIXME: Remove and configure graphiql to use auth ?
			if (isEnvDev() && req.headers.referer === 'http://localhost:3000/graphiql') {
				return true;
			}
			return await this.parseRequest(req);
		}
		return false;
	}

	async parseRequest(req: EntityRequest) {
		const auth = req.headers?.authorization;
		if (!auth) {
			return false;
		}

		const authArr = auth.split(' ');
		const bearer = authArr[0];
		const token = authArr[1];

		if (
			!bearer
			|| bearer !== 'Bearer'
			|| !token
			|| !isJWT(token)
		) {
			return false;
		}

		req.user = await this.authResolver.verify(token);
		return true;
	}
}
