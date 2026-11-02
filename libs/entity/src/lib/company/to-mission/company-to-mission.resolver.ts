import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { MissionByManyLoader } from '../../mission/mission-by-many.loader';
import { MissionEntity } from '../../mission/mission.entity';
import { CompanyEntity } from '../company.entity';

@Resolver(() => CompanyEntity)
export class CompanyToMissionResolver {

	@ResolveField(() => [MissionEntity])
	missions(
		@Parent() company: CompanyEntity,
		@Loader(MissionByManyLoader) loader: DataLoader<string, MissionEntity[]>
	) {
		return loader.load(company._id);
	}
}
