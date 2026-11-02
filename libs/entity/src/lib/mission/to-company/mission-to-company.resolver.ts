import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { CompanyByOneLoader } from '../../company/company-by-one.loader';
import { CompanyEntity } from '../../company/company.entity';
import { MissionEntity } from '../../mission/mission.entity';

@Resolver(() => MissionEntity)
export class MissionToCompanyResolver {

	constructor(
	) { }

	@ResolveField(() => CompanyEntity)
	company(
		@Parent() mission: MissionEntity,
		@Loader(CompanyByOneLoader) loader: DataLoader<string, CompanyEntity>,
	) {
		return loader.load(mission.companyId);
	}
}
