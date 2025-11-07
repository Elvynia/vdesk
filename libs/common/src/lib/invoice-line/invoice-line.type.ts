import { Chunk } from "../chunk/chunk.type";
import { Mission } from "../mission/mission.type";

export interface InvoiceLine {

	count: number;

	desc: string;

	price: number;

	chunks?: Chunk[];

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
	let count = 0,
		price = 0;
	chunks.forEach((c) => {
		let mission = missions.find((m) => m._id === c.missionId)!;
		count += c.count;
		price += c.count * (mission.byDay ? mission.rate / mission.dayLength! : mission.rate)
	});
	let monthStart = (start.getMonth() + 1).toString().padStart(2, '0');
	let monthEnd = (end.getMonth() + 1).toString().padStart(2, '0');
	return {
		count,
		chunkIds: chunks.map((c) => c._id),
		desc: `Dev Web ${monthStart}/${start.getDate()} - ${monthEnd}/${end.getDate()}`,
		price
	}
}
