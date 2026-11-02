import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderByMany } from "../util/make-data-loader";
import { MissionRepository } from "./mission.repository";

@DataloaderProvider()
export class MissionByManyLoader {

	constructor(
		private repository: MissionRepository
	) { }

	createDataloader() {
		return makeDataloaderByMany(this.repository, 'companyId');
	}
}
