import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { MissionByOneLoader } from '../../mission/mission-by-one.loader';
import { MissionEntity } from '../../mission/mission.entity';
import { ChunkEntity } from '../chunk.entity';

@Resolver(() => ChunkEntity)
export class ChunkToMissionResolver {

	@ResolveField(() => MissionEntity)
	mission(
		@Parent() chunk: ChunkEntity,
		@Loader(MissionByOneLoader) loader: DataLoader<string, MissionEntity>
	) {
		return loader.load(chunk.missionId);
	}
}
