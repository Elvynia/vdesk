import { Module } from '@nestjs/common';
import { ChunkService } from './chunk.service';
import { ChunkResolver } from './chunk.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ChunkEntity, ChunkSchema } from './chunk.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: ChunkEntity.name,
				schema: ChunkSchema,
				collection: 'chunk',
			},
		]),
	],
	providers: [ChunkResolver, ChunkService],
	exports: [ChunkResolver, ChunkService],
})
export class ChunkModule {}
