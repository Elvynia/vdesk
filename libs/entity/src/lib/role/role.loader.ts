import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloader } from "../util/make-data-loader";
import { RoleRepository } from "./role.repository";

@DataloaderProvider()
export class RoleLoader {

	constructor(
		private repository: RoleRepository
	) { }

	createDataloader() {
		return makeDataloader(this.repository);
	}
}
