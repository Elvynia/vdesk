import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { ChunkByManyLoader } from '../../chunk/chunk-by-many.loader';
import { ChunkEntity } from '../../chunk/chunk.entity';
import { MissionEntity } from '../../mission/mission.entity';

@Resolver(() => MissionEntity)
export class MissionToChunkResolver {

	@ResolveField(() => [ChunkEntity])
	async chunks(
		@Parent() parent: MissionEntity,
		@Loader(ChunkByManyLoader) loader: DataLoader<string, ChunkEntity[]>
	) {
		return await loader.load(parent._id.toString());
	}

}
