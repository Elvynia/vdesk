import { AccountModule, AddressModule } from '@lv/entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_CONFIG } from '../config/type';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRoot(APP_CONFIG.database.url, {

			dbName: 'vdesk',
		}),
		GraphQLModule.forRoot<MercuriusDriverConfig>({
			driver: MercuriusDriver,
			autoSchemaFile: true,
			subscription: true,
			graphiql: true
		}),
		AddressModule,
		AccountModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
