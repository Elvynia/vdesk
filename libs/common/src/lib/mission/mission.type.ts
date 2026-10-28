import { Chunk } from '../chunk/chunk.type';
import { Company } from '../company/company.type';
import { IEntity } from '../util/entity.type';

export interface Mission extends IEntity {
	name: string;

	rate: number;

	byDay: boolean;

	dayLength?: number;

	start?: Date;

	end?: Date;

	desc?: string;

	companyId: string;
}

export interface MissionRead extends Mission {

	company: Pick<Company, 'name' | 'shortName'>;
}

export interface MissionActive extends Mission {

	chunks: Chunk[];

	company: Company;
}

export interface MissionState {
	missions: Record<string, MissionRead>;
}

export const selectMissions = (state: MissionState) => state.missions;
