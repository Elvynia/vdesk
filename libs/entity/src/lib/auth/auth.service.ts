import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountService } from "../account/account.service";
import { AuthResolver } from "./auth.resolver";

// Sign, verify & refresh
@Injectable()
export class AuthService {

	constructor(private accountService: AccountService, private authResolver: AuthResolver) { }

	async signIn(username: string, pass: string): Promise<any> {
		const account = await this.accountService.findByUsername(username);
		if (!account || account?.password !== pass) {
			throw new UnauthorizedException();
		}
		if (!account.enabled) {
			throw new UnauthorizedException();
		}
		return this.authResolver.generate(account);
	}


}
