import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { CompanyEntity } from '../../company/company.entity';
import { CompanyRepository } from '../../company/company.repository';
import { MissionEntity } from '../../mission/mission.entity';

@Resolver(() => MissionEntity)
export class MissionToCompanyResolver implements OnModuleInit {
	private companyRepository: CompanyRepository;

	constructor(
		private readonly moduleRef: ModuleRef
	) { }

	onModuleInit() {
		this.companyRepository = this.moduleRef.get(CompanyRepository, { strict: false });
	}

	@ResolveField(() => CompanyEntity)
	mission(@Parent() mission: MissionEntity) {
		return this.companyRepository.findOne(mission.companyId);
	}
}
