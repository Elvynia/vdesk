import { JwtPayload } from "jsonwebtoken";

export interface AuthJwtPayloadCreate {

	/**
	 *  Account id.
	 */
	acc: string;
}

export interface AuthJwtPayload extends JwtPayload, AuthJwtPayloadCreate {
}

export interface AuthToken {
	apiToken: string;
	refreshToken: string;
}

export interface LoginRequest {
	username: string;
	password: string;
}
