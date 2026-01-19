import { CommonConfig } from "./config.type";

// FIXME: Defaults override env values.
export default () => ({
	database: {
		// name: 'vdesk'
	},
	jwt: {
		expiresApi: '10min',
		expiresRefresh: '10d',
		expiresReset: '1h',
	},
	web: {
		graphqlPath: '/api',
		port: 3000
	},
	tz: 'Europe/Paris'
} as CommonConfig);
