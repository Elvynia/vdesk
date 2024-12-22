import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_CONFIG } from '../config/type';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { AddressModule } from '@lv/entity';

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
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			subscription : true,
			graphiql: true
		}),
		AddressModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
