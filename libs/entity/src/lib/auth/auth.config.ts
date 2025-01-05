import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { CommonConfig } from "../config/config.type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthConfig implements JwtOptionsFactory {

	constructor(private configService: ConfigService<CommonConfig, true>) { }

	createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
		return {
			secret: this.configService.get("jwt.secret", {
				infer: true
			})
		}
	}

}
