import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionModule } from '../mission/mission.module';
import { ChunkEntity, ChunkSchema } from './chunk.entity';
import { ChunkLoader } from './chunk.loader';
import { ChunkRepository } from './chunk.repository';
import { ChunkResolver } from './chunk.resolver';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: ChunkEntity.name,
				schema: ChunkSchema,
				collection: 'chunk',
			},
		]),
		MissionModule,
	],
	providers: [
		ChunkLoader,
		ChunkResolver,
		ChunkRepository
	],
	exports: [
		ChunkLoader,
		ChunkResolver,
		ChunkRepository
	],
})
export class ChunkModule { }
