import { reduceArrayToMap } from "@lv/common";
import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import DataLoader from "dataloader";
import { ChunkEntity } from "./chunk.entity";
import { ChunkRepository } from "./chunk.repository";

@DataloaderProvider()
export class ChunkLoader {

	constructor(
		private repository: ChunkRepository
	) { }

	createDataloader() {
		return new DataLoader<string, ChunkEntity[]>(async (keys) => {
			const results = (await this.repository.findByMissionIds(keys)).reduce(
				reduceArrayToMap('missionId'),
				new Map<string, ChunkEntity[]>()
			);
			return keys.map((k) => results.get(k) || []);
		}, {
			cache: false
		});
	}
}
