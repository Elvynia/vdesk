import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChunkModule } from '../chunk/chunk.module';
import { PubSubModule } from '../util/pubsub.module';
import { MissionEntity, MissionSchema } from './mission.entity';
import { MissionRepository } from './mission.repository';
import { MissionResolver } from './mission.resolver';

@Module({
	imports: [
		ChunkModule,
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
		MissionResolver,
		MissionRepository,
	],
	exports: [
		MissionResolver,
		MissionRepository,
	],
})
export class MissionModule { }
