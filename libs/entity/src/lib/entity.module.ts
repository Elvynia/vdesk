import { isEnvDev } from '@lv/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { MongooseModule } from '@nestjs/mongoose';
import configDefaults from './config/config.defaults';
import { CommonConfig } from './config/config.type';

@Module({
	controllers: [],
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			load: [configDefaults]
		}),
		MongooseModule.forRootAsync({
			useFactory: (configService: ConfigService<CommonConfig>) => ({
				dbName: configService.get('database.name', {
					infer: true
				}),
				uri: configService.get('database.url', {
					infer: true
				})
			}),
			inject: [
				ConfigService,
			],
		}),
		GraphQLModule.forRootAsync<MercuriusDriverConfig>({
			driver: MercuriusDriver,
			useFactory: (configService: ConfigService<CommonConfig>) => ({
				autoSchemaFile: true,
				subscription: true,
				graphiql: isEnvDev(),
				path: configService.get('web.graphqlPath', {
					infer: true
				}),
				fieldResolverEnhancers: ['guards']
			}),
			inject: [
				ConfigService,
			],
		}),
	],
})
export class EntityModule { }
