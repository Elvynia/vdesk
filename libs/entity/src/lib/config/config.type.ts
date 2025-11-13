
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
		globalPath: string;
		graphqlPath: string;
		port: number;
	}
	tz: string;
}
