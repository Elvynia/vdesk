
export interface CommonConfig {
	database: {
		name: string;
		url: string;
	};
	jwt: {
		expiresApi: string;
		expiresRefresh: string;
		expiresReset: string;
		secret: string;
	};
	web: {
		apiPath: string;
		port: number;
	}
	tz: string;
}
