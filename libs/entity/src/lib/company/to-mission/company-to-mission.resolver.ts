import {
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { MissionEntity } from '../../mission/mission.entity';
import { MissionLoader } from '../../mission/mission.loader';
import { CompanyEntity } from '../company.entity';

@Resolver(() => CompanyEntity)
export class CompanyToMissionResolver {

	@ResolveField(() => MissionEntity)
	missions(
		@Parent() company: CompanyEntity,
		@Loader(MissionLoader) loader: DataLoader<string, MissionEntity>
	) {
		return loader.load(company._id);
	}
}
