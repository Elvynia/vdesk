import {
	Args,
	Mutation,
	Query,
	Resolver
} from '@nestjs/graphql';
import { MissionResolver } from '../mission/mission.resolver';
import { ChunkCreateEntity, ChunkEntity, ChunkPatchEntity } from './chunk.entity';
import { ChunkRepository } from './chunk.repository';

@Resolver(() => ChunkEntity)
export class ChunkResolver {

	constructor(
		private readonly chunkRepository: ChunkRepository,
		private readonly missionResolver: MissionResolver
	) { }

	@Mutation(() => ChunkEntity)
	async createChunk(@Args('createChunkInput') createChunkInput: ChunkCreateEntity) {

		const chunk = await this.chunkRepository.create(createChunkInput);
		this.missionResolver.publishIfActive(chunk.missionId);
		return chunk;
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
	async patchChunk(@Args('patchChunkInput') patchChunkInput: ChunkPatchEntity) {
		const chunk = await this.chunkRepository.patch(patchChunkInput._id, patchChunkInput);
		chunk && this.missionResolver.publishIfActive(chunk.missionId);
		return chunk;
	}

	@Mutation(() => ChunkEntity)
	async removeChunk(@Args('id', { type: () => String }) id: string) {
		const chunk = await this.chunkRepository.remove(id);
		chunk && this.missionResolver.publishIfActive(chunk.missionId);
		return chunk;
	}
}
