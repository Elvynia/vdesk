import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
	Args,
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { ChunkEntity } from '../../chunk/chunk.entity';
import { ChunkRepository } from '../../chunk/chunk.repository';
import { MissionEntity } from '../../mission/mission.entity';

@Resolver(() => MissionEntity)
export class MissionToChunkResolver implements OnModuleInit {
	private chunkRepository: ChunkRepository;

	constructor(
		private readonly moduleRef: ModuleRef
	) { }

	onModuleInit() {
		this.chunkRepository = this.moduleRef.get(ChunkRepository, { strict: false });
	}

	@ResolveField(() => [ChunkEntity])
	async chunks(
		@Parent() parent: MissionEntity,
		@Args('active', { nullable: true }) active: boolean
	) {
		return await this.chunkRepository.findByMission(parent._id.toString(), active);
	}

}
