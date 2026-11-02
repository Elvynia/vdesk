import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderByOne } from "../util/make-data-loader";
import { RoleRepository } from "./role.repository";

@DataloaderProvider()
export class RoleByOneLoader {

	constructor(
		private repository: RoleRepository
	) { }

	createDataloader() {
		return makeDataloaderByOne(this.repository);
	}
}
