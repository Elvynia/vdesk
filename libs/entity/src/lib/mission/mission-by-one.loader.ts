import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderByOne } from "../util/make-data-loader";
import { MissionRepository } from "./mission.repository";

@DataloaderProvider()
export class MissionByOneLoader {

	constructor(
		private repository: MissionRepository
	) { }

	createDataloader() {
		return makeDataloaderByOne(this.repository);
	}
}
