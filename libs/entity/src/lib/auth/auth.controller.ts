import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequest } from "./auth.type";
import { MappingPublic } from "../decorator/mapping-public";

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
