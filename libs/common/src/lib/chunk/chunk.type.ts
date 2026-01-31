import { Mission } from '../mission/mission.type';
import { IEntity } from '../util/entity.type';

export interface Chunk extends IEntity {
	count: number;

	date: Date | string;

	desc: string;

	invoiced: boolean;

	paid: boolean;

	mission?: Mission;

	missionId: string;
}

export interface ChunkState {
	chunks: Record<string, Chunk>;
}

export const selectChunks = (state: ChunkState) => state.chunks;

export function makeChunkFinder(chunks: Chunk[]) {
	return (start: Date, end?: Date) => chunks.filter((c) => {
		const cDate = new Date(c.date).getTime();
		return end ? start.getTime() <= cDate && cDate <= end.getTime()
			: start.getTime() === cDate;
	});
}
