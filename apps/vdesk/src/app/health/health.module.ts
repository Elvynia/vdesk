import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
	imports: [
		TerminusModule,
		ConfigModule,
		MongooseModule
	],
	controllers: [HealthController],
})
export class HealthModule { }
