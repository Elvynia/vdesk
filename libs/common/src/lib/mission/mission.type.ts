import { Chunk } from '../chunk/chunk.type';
import { IEntity } from '../util/entity.type';

export interface Mission extends IEntity {
	name: string;

	rate: number;

	byDay?: boolean;

	dayLength?: number;

	start?: Date;

	end?: Date;

	desc?: string;

	chunks: Chunk[];
}

export interface MissionState {
	missions: Record<string, Mission>;
}

export const selectMissions = (state: MissionState) => state.missions;
