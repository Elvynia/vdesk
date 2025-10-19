import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChunkEntity, ChunkSchema } from './chunk.entity';
import { ChunkResolver } from './chunk.resolver';
import { ChunkRepository } from './chunk.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: ChunkEntity.name,
				schema: ChunkSchema,
				collection: 'chunk',
			},
		])
	],
	providers: [ChunkResolver, ChunkRepository],
	exports: [ChunkResolver, ChunkRepository],
})
export class ChunkModule { }
