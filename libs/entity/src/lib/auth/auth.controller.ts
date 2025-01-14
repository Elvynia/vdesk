import { AuthToken, LoginRequest } from "@lv/common";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { MappingPublic } from "../decorator/mapping-public";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@HttpCode(HttpStatus.OK)
	@Post('login')
	@MappingPublic()
	signIn(@Body() req: LoginRequest) {
		return this.authService.signIn(req.username, req.password);
	}
	@HttpCode(HttpStatus.OK)
	@Post('refresh')
	@MappingPublic()
	refresh(@Body() req: AuthToken) {
		return this.authService.refresh(req);
	}
}
