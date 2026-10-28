import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloader } from "../util/make-data-loader";
import { MissionRepository } from "./mission.repository";

@DataloaderProvider()
export class MissionLoader {

	constructor(
		private repository: MissionRepository
	) { }

	createDataloader() {
		return makeDataloader(this.repository);
	}
}
