import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MappingPublic } from "../decorator/mapping-public";
import { LoginRequest } from "@lv/common";

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@HttpCode(HttpStatus.OK)
	@Post('login')
	@MappingPublic()
	signIn(@Body() req: LoginRequest) {
		return this.authService.signIn(req.username, req.password);
	}
}
