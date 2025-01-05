import { AuthJwtPayload, AuthJwtPayloadCreate, AuthToken } from "@lv/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { AccountEntity } from "../account/account.entity";
import { CommonConfig } from "../config/config.type";

@Injectable()
export class AuthResolver {

	// FIXME: Should be AuthConfig type.
	constructor(private jwtService: JwtService, private config: ConfigService<CommonConfig>) { }

	async defaultOptions() {
		return {
			algorithm: 'RS512',
			issuer: 'vdesk',
			secret: await this.config.get('jwt.secret', {
				infer: true
			})
		} as JwtSignOptions
	}

	async getAccountOptions(account: AccountEntity, expiresKey: string) {
		return {
			...this.defaultOptions,
			// audience: account.role,

			subject: account.username,
			expiresIn: await this.config.get('jwt.expires' + expiresKey as any, {
				infer: true
			}),
		} as JwtSignOptions
	}

	async generate(account: AccountEntity): Promise<AuthToken> {
		const payload = { acc: account.id } as AuthJwtPayloadCreate;
		return {
			apiToken: await this.jwtService.signAsync(payload, {
				...await this.getAccountOptions(account, 'Api')
			}),
			refreshToken: await this.jwtService.signAsync(payload, {
				...await this.getAccountOptions(account, 'Refresh')
			}),
		};
	}

	async verify(token: string) {
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			return this.jwtService.verify<AuthJwtPayload>(token, {
				...await this.defaultOptions
			});
		} catch {
			throw new UnauthorizedException();
		}
	}
}
