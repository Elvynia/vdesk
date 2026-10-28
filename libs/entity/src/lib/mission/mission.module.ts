import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSubModule } from '../util/pubsub.module';
import { MissionEntity, MissionSchema } from './mission.entity';
import { MissionLoader } from './mission.loader';
import { MissionRepository } from './mission.repository';
import { MissionResolver } from './mission.resolver';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: MissionEntity.name,
				schema: MissionSchema,
				collection: 'mission',
			},
		]),
		PubSubModule,
	],
	providers: [
		MissionLoader,
		MissionResolver,
		MissionRepository,
	],
	exports: [
		MissionLoader,
		MissionResolver,
		MissionRepository,
	],
})
export class MissionModule { }
