import { Chunk } from "../chunk/chunk.type";
import { Mission } from "../mission/mission.type";

export interface InvoiceLine {

	count: number;

	desc: string;

	price: number;

	chunks?: Chunk[];

	chunkIds: string[];

	total?: number;
}

export interface InvoiceLineCreate {

	count: number;

	desc: string;

	price: number;

	chunkIds: string[];

}

export function makeInvoiceLineWeek({
	missions,
	chunks,
	start,
	end
}: {
	missions: Mission[];
	chunks: Chunk[];
	start: Date;
	end: Date;
}): InvoiceLine {
	let count = chunks.map((c) => c.count).reduce((a, b) => a + b, 0);
	if (missions[0].byDay) {
		count = Math.ceil(count / missions[0].dayLength!);
	}
	const price = missions[0].rate;
	const monthStart = (start.getMonth() + 1).toString().padStart(2, '0');
	const monthEnd = (end.getMonth() + 1).toString().padStart(2, '0');
	return {
		count,
		chunkIds: chunks.map((c) => c._id),
		desc: `Dev Web ${monthStart}/${start.getDate()} - ${monthEnd}/${end.getDate()}`,
		price
	}
}
