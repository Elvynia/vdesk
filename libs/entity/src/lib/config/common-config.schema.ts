import * as Joi from 'joi';
import { CommonConfig } from './common-config.type';

export const commonConfigSchema = Joi.object<CommonConfig>({
	// ---- database ----
	DATABASE_URL: Joi.string().uri().required(),
	DATABASE_NAME: Joi.string().default('vdesk'),

	// ---- jwt ----
	JWT_SECRET: Joi.string().min(16).required(),
	JWT_EXPIRES_API: Joi.string().default('10min'),
	JWT_EXPIRES_REFRESH: Joi.string().default('10d'),
	JWT_EXPIRES_RESET: Joi.string().default('1h'),

	// ---- web ----
	WEB_PORT: Joi.number().port().default(3000),
	WEB_GRAPHQL_PATH: Joi.string().default('/api'),
	WEB_GLOBAL_PATH: Joi.string().optional(),

	// ---- misc ----
	TZ: Joi.string().default('Europe/Paris'),
})
	.required()
	.unknown(true);
