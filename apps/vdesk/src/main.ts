import { isEnvDev } from '@lv/common';
import { CommonConfig } from '@lv/entity';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { default as Handlebars, HelperOptions } from 'handlebars';
import { join } from 'path';
import { AppModule } from './app/app.module';

// Mongoose debug
if (isEnvDev()) {
	import('mongoose').then((mongoose) => mongoose.set('debug', true));
}
console.log('process.env.DATABASE_URL at runtime:', process.env.DATABASE_URL);
console.log('process.env.NODE_ENV at runtime:', process.env.NODE_ENV);

// Handlebars helpers
Handlebars.registerHelper('parseDate', function (value: Date) {
	return value.toLocaleDateString();
});
Handlebars.registerHelper('parseCurrency', function (value: number, options: HelperOptions) {
	const currency = options.data.root.invoice.company.type.currency
	if (value) {
		return value.toLocaleString('fr', {
			style: "currency",
			currency,
			currencyDisplay: 'narrowSymbol',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}
	console.warn('No value in parseCurrency helper')
	return '';
});

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
		{
			cors: true
		}
	);
	const config = app.get<ConfigService<CommonConfig>>(ConfigService);
	app.setViewEngine({
		engine: {
			handlebars: Handlebars
		},
		templates: join(__dirname, 'templates'),
	});
	app.useStaticAssets({
		root: [
			join(__dirname, 'assets'),
			join(__dirname, 'styles')
		]
	})
	const globalPrefix = config.get('WEB_GLOBAL_PATH', {
		infer: true
	});
	if (globalPrefix) {
		app.setGlobalPrefix(globalPrefix);
	}
	const port = config.get('WEB_PORT', {
		infer: true
	});
	await app.listen(port);
	Logger.log(
		`🗂️ LV Desk is running on: http://localhost:${port}/${globalPrefix || ''}`
	);
}

bootstrap();
