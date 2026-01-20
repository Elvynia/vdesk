import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { CommonConfig } from "../config/common-config.type";

@Injectable()
export class AuthConfig implements JwtOptionsFactory {

	constructor(private configService: ConfigService<CommonConfig, true>) { }

	createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
		return {
			secret: this.configService.get("JWT_SECRET", {
				infer: true
			})
		}
	}

}
