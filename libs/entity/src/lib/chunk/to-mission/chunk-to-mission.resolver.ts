import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { MissionEntity } from '../../mission/mission.entity';
import { MissionService } from '../../mission/mission.service';
import { ChunkEntity } from '../chunk.entity';

@Resolver(() => ChunkEntity)
export class ChunkToMissionResolver implements OnModuleInit {
	private missionService: MissionService;

	constructor(
		private readonly moduleRef: ModuleRef
	) { }

	onModuleInit() {
		this.missionService = this.moduleRef.get(MissionService, { strict: false });
	}

	@ResolveField(() => MissionEntity)
	mission(@Parent() chunk: ChunkEntity) {
		return this.missionService.findOne(chunk.missionId);
	}
}
