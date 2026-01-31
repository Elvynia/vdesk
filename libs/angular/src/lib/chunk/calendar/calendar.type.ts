import { DateRange } from "@angular/material/datepicker";
import { Chunk } from "@lv/common";

export interface ChunkCalendarSelect {
	type: 'single' | 'range';
	chunks: Chunk[];
}

export interface ChunkCalendarSelectSingle extends ChunkCalendarSelect {
	type: 'single';
	date: Date;
}

export interface ChunkCalendarSelectRange extends ChunkCalendarSelect {
	type: 'range';
	range: DateRange<Date>;
}

export type ChunkCalendarSelectAny = ChunkCalendarSelectSingle | ChunkCalendarSelectRange;
