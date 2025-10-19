import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChunkModule } from '../chunk/chunk.module';
import { MissionEntity, MissionSchema } from './mission.entity';
import { MissionResolver } from './mission.resolver';
import { MissionRepository } from './mission.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: MissionEntity.name,
				schema: MissionSchema,
				collection: 'mission',
			},
		]),
		ChunkModule
	],
	providers: [MissionResolver, MissionRepository],
	exports: [MissionResolver, MissionRepository],
})
export class MissionModule { }
