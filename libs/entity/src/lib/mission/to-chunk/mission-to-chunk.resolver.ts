import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { ChunkEntity } from '../../chunk/chunk.entity';
import { ChunkService } from '../../chunk/chunk.service';
import { MissionEntity } from '../../mission/mission.entity';

@Resolver(() => MissionEntity)
export class MissionToChunkResolver implements OnModuleInit {
	private chunkService: ChunkService;

	constructor(
		private readonly moduleRef: ModuleRef
	) { }

	onModuleInit() {
		this.chunkService = this.moduleRef.get(ChunkService, { strict: false });
	}

	@ResolveField(() => [ChunkEntity])
	async chunks(@Parent() parent: MissionEntity) {
		return await this.chunkService.findByMission(parent._id.toString());
	}

}
