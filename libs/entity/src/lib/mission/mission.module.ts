import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSubModule } from '../util/pubsub.module';
import { MissionByManyLoader } from './mission-by-many.loader';
import { MissionByOneLoader } from './mission-by-one.loader';
import { MissionEntity, MissionSchema } from './mission.entity';
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
		MissionByManyLoader,
		MissionByOneLoader,
		MissionResolver,
		MissionRepository,
	],
	exports: [
		MissionByManyLoader,
		MissionByOneLoader,
		MissionResolver,
		MissionRepository,
	],
})
export class MissionModule { }
