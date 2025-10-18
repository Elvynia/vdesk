import { Module } from '@nestjs/common';
import { MissionToChunkResolver } from './mission-to-chunk.resolver';

@Module({
	providers: [MissionToChunkResolver],
	exports: [MissionToChunkResolver],
})
export class MissionToChunkModule { }
