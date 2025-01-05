import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonConfig } from './config/config.type';

@Module({
	controllers: [],
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			useFactory: (configService: ConfigService<CommonConfig>) => {
				return ({
					dbName: configService.get('database.name', {
						infer: true
					}),
					uri: configService.get('database.url', {
						infer: true
					})
				})
			},
			inject: [ConfigService],
		}),
		GraphQLModule.forRoot<MercuriusDriverConfig>({
			driver: MercuriusDriver,
			autoSchemaFile: true,
			subscription: true,
			graphiql: true,
			path: 'api',
			fieldResolverEnhancers: ['guards']
		}),
	],
	exports: [
		ConfigModule
	]
})
export class EntityModule { }
