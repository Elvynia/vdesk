import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChunkEntity, ChunkSchema } from './chunk.entity';
import { ChunkResolver } from './chunk.resolver';
import { ChunkService } from './chunk.service';

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
	providers: [ChunkResolver, ChunkService],
	exports: [ChunkResolver, ChunkService],
})
export class ChunkModule { }
