import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderToMany } from "../util/make-data-loader";
import { ChunkEntity } from "./chunk.entity";
import { ChunkRepository } from "./chunk.repository";

@DataloaderProvider()
export class ChunkLoader {

	constructor(
		private repository: ChunkRepository
	) { }

	createDataloader() {
		return makeDataloaderToMany(this.repository, 'missionId');
	}
}
