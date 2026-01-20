
export interface CommonConfig {
	DATABASE_NAME: string;
	DATABASE_URL: string;

	JWT_SECRET: string;
	JWT_EXPIRES_API: string;
	JWT_EXPIRES_REFRESH: string;
	JWT_EXPIRES_RESET: string;

	WEB_GLOBAL_PATH: string;
	WEB_GRAPHQL_PATH: string;
	WEB_PORT: number;

	TZ: string;
}
