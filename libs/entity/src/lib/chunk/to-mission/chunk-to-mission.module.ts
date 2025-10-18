import { Module } from '@nestjs/common';
import { ChunkToMissionResolver } from './chunk-to-mission.resolver';

@Module({
	providers: [ChunkToMissionResolver],
	exports: [ChunkToMissionResolver],
})
export class ChunkToMissionModule { }
