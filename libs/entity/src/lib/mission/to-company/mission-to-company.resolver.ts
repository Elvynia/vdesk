import {
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { CompanyEntity } from '../../company/company.entity';
import { CompanyLoader } from '../../company/company.loader';
import { MissionEntity } from '../../mission/mission.entity';

@Resolver(() => MissionEntity)
export class MissionToCompanyResolver {

	constructor(
	) { }

	@ResolveField(() => String, { nullable: true })
	company(
		@Parent() mission: MissionEntity,
		@Loader(CompanyLoader) loader: DataLoader<string, CompanyEntity>,
	) {
		return loader.load(mission.companyId);
	}
}
