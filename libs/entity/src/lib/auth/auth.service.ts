import { AuthToken } from "@lv/common";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountService } from "../account/account.service";
import { AuthResolver } from "./auth.resolver";

// Sign, verify & refresh
@Injectable()
export class AuthService {

	constructor(private accountService: AccountService, private authResolver: AuthResolver) { }

	async signIn(username: string, pass: string): Promise<AuthToken> {
		const account = await this.accountService.findByUsername(username);
		if (!account || account?.password !== pass) {
			throw new BadRequestException('Incorrect username or password. Try again');
		}
		if (!account.enabled) {
			throw new BadRequestException('This account is not active. Please contact the administrator');
		}
		return this.authResolver.generate(account);
	}

	async refresh(req: AuthToken): Promise<AuthToken> {
		if (await this.authResolver.verify(req.apiToken, false)) {
			throw new BadRequestException('Token still valid');
		}
		const jwt = await this.authResolver.verify(req.refreshToken);
		const account = await this.accountService.findOne(jwt.acc);
		if (account && account.enabled) {
			return this.authResolver.generate(account);
		}
		throw new UnauthorizedException('Invalid refresh token');
	}


}
