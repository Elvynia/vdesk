import { AuthToken, LoginRequest } from "@lv/common";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { MappingPublic } from "../decorator/mapping-public";
import { AuthRepository } from "./auth.repository";

@Controller('auth')
export class AuthController {
	constructor(private authRepository: AuthRepository) { }

	@HttpCode(HttpStatus.OK)
	@Post('login')
	@MappingPublic()
	signIn(@Body() req: LoginRequest) {
		return this.authRepository.signIn(req.username, req.password);
	}
	@HttpCode(HttpStatus.OK)
	@Post('refresh')
	@MappingPublic()
	refresh(@Body() req: AuthToken) {
		return this.authRepository.refresh(req);
	}
}
