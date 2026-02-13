import { isEnvDev } from '@lv/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import type { Context as WSContext } from 'graphql-ws';
import { AuthModule } from './auth/auth.module';
import { AuthResolver } from './auth/auth.resolver';
import { commonConfigSchema } from './config/common-config.schema';
import { CommonConfig } from './config/common-config.type';
import { ExceptionHandlerPlugin } from './util/apollo/exception-handler.plugin';

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
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			imports: [AuthModule],
			useFactory: (
				configService: ConfigService<CommonConfig>,
				authResolver: AuthResolver
			) => ({
				autoSchemaFile: true,
				path: configService.get('WEB_GRAPHQL_PATH', {
					infer: true
				}),
				plugins: [
					ExceptionHandlerPlugin
				],
				subscriptions: {
					'graphql-ws': {
						onConnect: async (context: WSContext<any, any>) => {
							const token = context.connectionParams?.authorization as string;
							console.debug(`[GraphQLModule] WS connect attempt (token=${!!token})`);
							try {
								const { id } = await authResolver.verify(token);
								console.info('[GraphQLModule] WS connect successful', id);
								return { id };
							} catch (e) {
								if (e instanceof UnauthorizedException) {
									return false;
								}
								console.error('[GraphQLModule] WS connect exception: ', e)
								context.extra.socket.close(1011, 'Internal error');
								return;
							}
						},
					}
				},
				graphiql: isEnvDev(),
				fieldResolverEnhancers: ['guards']
			}),
			inject: [
				ConfigService,
				AuthResolver
			],
		}),
	],
	providers: [
	]
})
export class EntityModule { }
