import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
	Args,
	Mutation,
	Query,
	Resolver
} from '@nestjs/graphql';
import { MissionService } from '../mission/mission.service';
import { ChunkCreate, ChunkEntity, ChunkUpdate } from './chunk.entity';
import { ChunkService } from './chunk.service';

@Resolver(() => ChunkEntity)
export class ChunkResolver implements OnModuleInit {
	private missionService: MissionService;

	constructor(private readonly chunkService: ChunkService,
		private readonly moduleRef: ModuleRef
	) { }

	onModuleInit() {
		this.missionService = this.moduleRef.get(MissionService, { strict: false });
	}

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

	// @ResolveField(() => MissionEntity)
	// mission(@Parent() chunk: ChunkEntity) {
	// 	return this.missionService.findOne(chunk.missionId);
	// }
}
