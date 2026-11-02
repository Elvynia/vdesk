import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionModule } from '../mission/mission.module';
import { ChunkByManyLoader } from './chunk-by-many.loader';
import { ChunkEntity, ChunkSchema } from './chunk.entity';
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
		ChunkByManyLoader,
		ChunkResolver,
		ChunkRepository
	],
	exports: [
		ChunkByManyLoader,
		ChunkResolver,
		ChunkRepository
	],
})
export class ChunkModule { }
