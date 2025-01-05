import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountEntity, AccountSchema } from '../account/account.entity';
import { AccountResolver } from '../account/account.resolver';
import { AccountService } from '../account/account.service';
import { AuthConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
	controllers: [
		AuthController
	],
	imports: [
		JwtModule.registerAsync({
			useClass: AuthConfig,
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([
			{
				name: AccountEntity.name,
				schema: AccountSchema,
				collection: 'account',
			},
		]),
	],
	providers: [
		AuthConfig,
		AuthResolver,
		AuthService,
		AccountResolver,
		AccountService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		}
	],
	exports: [
		AuthResolver,
		AuthService,
		AccountResolver,
		AccountService,
		JwtModule,
	],
})
export class AuthModule { }
