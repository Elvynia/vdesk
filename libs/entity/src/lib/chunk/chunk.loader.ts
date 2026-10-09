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
		return new DataLoader<string, ChunkEntity>(async (ids) => this.repository.findAllByIds(ids));
	}
}
