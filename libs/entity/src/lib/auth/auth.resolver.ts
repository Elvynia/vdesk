import { AuthJwtPayload, AuthJwtPayloadCreate, AuthToken } from "@lv/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions, TokenExpiredError } from "@nestjs/jwt";
import { AccountEntity } from "../account/account.entity";
import { CommonConfig } from "../config/common-config.type";

@Injectable()
export class AuthResolver {

	// FIXME: Should be AuthConfig type.
	constructor(private jwtService: JwtService, private config: ConfigService<CommonConfig>) { }

	async defaultOptions() {
		return {
			algorithm: 'RS512',
			issuer: 'vdesk',
			secret: await this.config.get('JWT_SECRET', {
				infer: true
			})
		} as JwtSignOptions
	}

	async getAccountOptions(account: AccountEntity, expiresKey: string) {
		return {
			...this.defaultOptions,
			// FIXME: audience: account.role.authorizations,
			subject: account.username,
			expiresIn: await this.config.get('JWT_EXPIRES_' + expiresKey as keyof CommonConfig),
		} as JwtSignOptions
	}

	async generate(account: AccountEntity): Promise<AuthToken> {
		const payload = { acc: account._id } as AuthJwtPayloadCreate;
		return {
			apiToken: await this.jwtService.signAsync(payload, {
				...await this.getAccountOptions(account, 'API')
			}),
			refreshToken: await this.jwtService.signAsync(payload, {
				...await this.getAccountOptions(account, 'REFRESH')
			}),
		};
	}

	async verify(token: string): Promise<AuthJwtPayload>;
	async verify(token: string, throwOnExpiry: false): Promise<AuthJwtPayload>;
	async verify(token: string, throwOnExpiry: boolean = true): Promise<AuthJwtPayload | undefined> {
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			return this.jwtService.verify<AuthJwtPayload>(token, {
				...await this.defaultOptions
			});
		} catch (e) {
			if (!throwOnExpiry && e instanceof TokenExpiredError) {
				return undefined;
			}
			throw new UnauthorizedException();
		}
	}
}
