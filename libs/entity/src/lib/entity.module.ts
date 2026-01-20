import { isEnvDev } from '@lv/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { MongooseModule } from '@nestjs/mongoose';
import { commonConfigSchema } from './config/common-config.schema';
import { CommonConfig } from './config/common-config.type';

@Module({
	controllers: [],
	imports: [
		ConfigModule.forRoot({
			cache: true,
			expandVariables: true,
			envFilePath: 'apps/vdesk/.env',
			ignoreEnvFile: !isEnvDev(),
			isGlobal: true,
			validationSchema: commonConfigSchema,
		}),
		MongooseModule.forRootAsync({
			useFactory: (configService: ConfigService<CommonConfig>) => ({
				dbName: configService.get('DATABASE_NAME', {
					infer: true
				}),
				uri: configService.get('DATABASE_URL', {
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
				path: configService.get('WEB_GRAPHQL_PATH', {
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
