import {
	Resolver,
	Query,
	Mutation,
	Args,
	Parent,
	ResolveField,
} from '@nestjs/graphql';
import { ChunkService } from './chunk.service';
import { ChunkEntity, ChunkCreate, ChunkUpdate } from './chunk.entity';

@Resolver(() => ChunkEntity)
export class ChunkResolver {
	constructor(private readonly chunkService: ChunkService) {}

	@Mutation(() => ChunkEntity)
	createChunk(@Args('createChunkInput') createChunkInput: ChunkCreate) {
		return this.chunkService.create(createChunkInput);
	}

	@Query(() => [ChunkEntity], { name: 'chunk' })
	findAll() {
		return this.chunkService.findAll();
	}

	@Query(() => ChunkEntity, { name: 'chunkId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.chunkService.findOne(id);
	}

	@Mutation(() => ChunkEntity)
	updateChunk(@Args('updateChunkInput') updateChunkInput: ChunkUpdate) {
		return this.chunkService.update(updateChunkInput._id, updateChunkInput);
	}

	@Mutation(() => ChunkEntity)
	removeChunk(@Args('id', { type: () => String }) id: string) {
		return this.chunkService.remove(id);
	}
}
