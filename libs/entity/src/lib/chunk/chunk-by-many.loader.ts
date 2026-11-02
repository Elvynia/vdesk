import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderByMany } from "../util/make-data-loader";
import { ChunkRepository } from "./chunk.repository";

@DataloaderProvider()
export class ChunkByManyLoader {

	constructor(
		private repository: ChunkRepository
	) { }

	createDataloader() {
		return makeDataloaderByMany(this.repository, 'missionId');
	}
}
