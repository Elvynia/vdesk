import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { MissionEntity } from '../../mission/mission.entity';
import { MissionRepository } from '../../mission/mission.repository';
import { ChunkEntity } from '../chunk.entity';

@Resolver(() => ChunkEntity)
export class ChunkToMissionResolver implements OnModuleInit {
	private missionRepository: MissionRepository;

	constructor(
		private readonly moduleRef: ModuleRef
	) { }

	onModuleInit() {
		this.missionRepository = this.moduleRef.get(MissionRepository, { strict: false });
	}

	@ResolveField(() => MissionEntity)
	mission(@Parent() chunk: ChunkEntity) {
		return this.missionRepository.findOne(chunk.missionId);
	}
}
