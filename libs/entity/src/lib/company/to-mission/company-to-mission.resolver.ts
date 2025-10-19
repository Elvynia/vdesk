import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { MissionEntity } from '../../mission/mission.entity';
import { MissionRepository } from '../../mission/mission.repository';
import { CompanyEntity } from '../company.entity';

@Resolver(() => CompanyEntity)
export class CompanyToMissionResolver implements OnModuleInit {
	private missionRepository: MissionRepository;

	constructor(
		private readonly moduleRef: ModuleRef
	) { }

	onModuleInit() {
		this.missionRepository = this.moduleRef.get(MissionRepository, { strict: false });
	}

	@ResolveField(() => MissionEntity)
	mission(@Parent() company: CompanyEntity) {
		return this.missionRepository.findByCompany(company._id);
	}
}
