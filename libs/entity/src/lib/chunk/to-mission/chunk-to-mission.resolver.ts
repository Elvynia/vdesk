import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { MissionEntity } from '../../mission/mission.entity';
import { MissionLoader } from '../../mission/mission.loader';
import { ChunkEntity } from '../chunk.entity';

@Resolver(() => ChunkEntity)
export class ChunkToMissionResolver {

	@ResolveField(() => MissionEntity)
	mission(
		@Parent() chunk: ChunkEntity,
		@Loader(MissionLoader) loader: DataLoader<string, MissionEntity>
	) {
		return loader.load(chunk.missionId);
	}
}
