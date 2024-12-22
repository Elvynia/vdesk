export const APP_CONFIG = {
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		url: process.env.DATABASE_URL || 'mongodb+srv://ogod:MvYj3lGQqMNK10Pv@ogod.igfun.mongodb.net/'
	}
};
