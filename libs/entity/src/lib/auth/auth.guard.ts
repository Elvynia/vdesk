import {
	CanActivate,
	Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { isJWT } from 'class-validator';
import { ErrorWithProps } from 'mercurius';
import { MappingPublicKey } from '../decorator/mapping-public';
import { EntityRequest } from '../util/request.type';
import { AuthResolver } from './auth.resolver';
import { isEnvDev } from '../config/is-env-dev';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly authResolver: AuthResolver,
	) { }

	public async canActivate(context: GqlExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(MappingPublicKey, [
			context.getHandler(),
			context.getClass(),
		]);
		let req = context.switchToHttp().getRequest<EntityRequest>()
		if (!req.headers) {
			req = GqlExecutionContext.create(context).getContext().req;
		}
		const valid = await this.setHttpHeader(
			req,
			isPublic,
		);

		if (!valid) {
			throw new ErrorWithProps('Session expired', {}, 401);
		}

		return valid;
	}

	/**
	 * Sets HTTP Header
	 *
	 * Checks if the header has a valid Bearer token, validates it and sets the User ID as the user.
	 */
	private async setHttpHeader(
		req: EntityRequest,
		isPublic: boolean,
	): Promise<boolean> {
		if (isPublic) {
			return true;
		}
		// FIXME: Remove and configure graphiql to use auth ?
		if (isEnvDev() && req.headers.referer === 'http://localhost:3000/graphiql') {
			return true;
		}
		const auth = req.headers?.authorization;
		if (!auth) {
			return isPublic;
		}

		const authArr = auth.split(' ');
		const bearer = authArr[0];
		const token = authArr[1];

		if (!bearer || bearer !== 'Bearer') {
			return isPublic;
		}
		if (!token || !isJWT(token)) {
			return isPublic;
		}

		try {
			const { id } = await this.authResolver.verify(token);
			req.user = id;
			return true;
		} catch (_) {
			return false;
		}
	}
}
