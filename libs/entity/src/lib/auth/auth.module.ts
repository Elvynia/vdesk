import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountEntity, AccountSchema } from '../account/account.entity';
import { AccountResolver } from '../account/account.resolver';
import { AccountRepository } from '../account/account.repository';
import { AuthConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthRepository } from './auth.repository';
import { RoleModule } from '../role/role.module';

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
