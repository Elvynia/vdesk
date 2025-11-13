import { CommonConfig } from '@lv/entity';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { join } from 'path';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
		{
			cors: true
		}
	);
	const conf = app.get<ConfigService<CommonConfig>>(ConfigService);
	app.setViewEngine({
		engine: {
			handlebars: require('handlebars')
		},
		templates: join(__dirname, 'templates'),
	});
	const globalPrefix = conf.get('web.globalPath', {
		infer: true
	});
	if (globalPrefix) {
		app.setGlobalPrefix(globalPrefix);
	}
	const port = conf.get<number>('web.port', {
		infer: true
	}) || 3000;
	await app.listen(port);
	Logger.log(
		`🗂️ Desk is running on: http://localhost:${port}/${globalPrefix || ''}`
	);
}

bootstrap();
