import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountEntity, AccountSchema } from '../account/account.entity';
import { AccountRepository } from '../account/account.repository';
import { AccountResolver } from '../account/account.resolver';
import { RoleModule } from '../role/role.module';
import { AuthConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthRepository } from './auth.repository';
import { AuthResolver } from './auth.resolver';

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
		RoleModule,
	],
	providers: [
		AuthConfig,
		AuthResolver,
		AuthRepository,
		AccountResolver,
		AccountRepository,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		}
	],
	exports: [
		AuthResolver,
		AuthRepository,
		AccountResolver,
		AccountRepository,
		JwtModule,
		RoleModule,
	],
})
export class AuthModule { }
