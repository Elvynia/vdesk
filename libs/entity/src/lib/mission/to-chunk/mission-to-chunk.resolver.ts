import {
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ChunkEntity } from '../../chunk/chunk.entity';
import { ChunkLoader } from '../../chunk/chunk.loader';
import { MissionEntity } from '../../mission/mission.entity';

@Resolver(() => MissionEntity)
export class MissionToChunkResolver {

	@ResolveField(() => [ChunkEntity])
	async chunks(
		@Parent() parent: MissionEntity,
		@Loader(ChunkLoader) loader: DataLoader<string, ChunkEntity[]>
	) {
		return await loader.load(parent._id.toString());
	}

}
