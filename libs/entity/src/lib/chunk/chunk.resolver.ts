import {
	Args,
	Mutation,
	Query,
	Resolver
} from '@nestjs/graphql';
import { ChunkCreate, ChunkEntity, ChunkUpdate } from './chunk.entity';
import { ChunkRepository } from './chunk.repository';

@Resolver(() => ChunkEntity)
export class ChunkResolver {

	constructor(
		private readonly chunkRepository: ChunkRepository
	) { }

	@Mutation(() => ChunkEntity)
	createChunk(@Args('createChunkInput') createChunkInput: ChunkCreate) {
		return this.chunkRepository.create(createChunkInput);
	}

	@Query(() => [ChunkEntity], { name: 'chunk' })
	findAll() {
		return this.chunkRepository.findAll();
	}

	@Query(() => ChunkEntity, { name: 'chunkId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.chunkRepository.findOne(id);
	}

	@Mutation(() => ChunkEntity)
	updateChunk(@Args('updateChunkInput') updateChunkInput: ChunkUpdate) {
		return this.chunkRepository.update(updateChunkInput._id, updateChunkInput);
	}

	@Mutation(() => ChunkEntity)
	removeChunk(@Args('id', { type: () => String }) id: string) {
		return this.chunkRepository.remove(id);
	}
}
