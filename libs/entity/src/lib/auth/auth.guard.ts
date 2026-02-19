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
		const httpContext = context.switchToHttp();
		const req = gqlContext.req || httpContext.getRequest();
		if (req.user?.acc && req.user.iss === '') {
			// Authentified.
			return true;
		}
		if (req.connectionParams && req.extra.user.acc) {
			// Authentified by WS initial connection.
			req.user = req.extra.user;
			return true;
		} else if (req) {
			// FIXME: Remove and configure graphiql to use auth ?
			if (isEnvDev() && req.headers.referer === 'http://localhost:3000/api') {
				return true;
			}
			// Search for auth header and parse JWT.
			return await this.parseRequest(req);
		}
		// No recognized auth.
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
