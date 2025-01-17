import { IEntity } from '../util/entity.type';

export interface Chunk extends IEntity {
	count: number;

	date: Date;

	desc: string;

	invoiced: boolean;

	paid: boolean;
}

export interface ChunkState {
	chunks: Record<string, Chunk>;
}

export const selectChunks = (state: ChunkState) => state.chunks;
