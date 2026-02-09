import { isEnvDev } from '@lv/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthResolver } from './auth/auth.resolver';
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
			imports: [AuthModule],
			useFactory: (
				configService: ConfigService<CommonConfig>,
				authResolver: AuthResolver
			) => ({
				autoSchemaFile: true,
				subscription: {
					onConnect: async (data) => {
						const token = data.payload?.authorization;
						console.debug(`[GraphQLModule] WS connect attempt (token=${!!token})`);
						const { id } = await authResolver.verify(token);
						// Verify throw using mercurius ErrorWithProps but may miss proper object parameter.
						// returning false instead of throwing does not change anything.
						console.info('[GraphQLModule] WS connect successful', id);
						return { id };
					},
				},
				graphiql: isEnvDev(),
				path: configService.get('WEB_GRAPHQL_PATH', {
					infer: true
				}),
				fieldResolverEnhancers: ['guards']
			}),
			inject: [
				ConfigService,
				AuthResolver
			],
		}),
	],
})
export class EntityModule { }
