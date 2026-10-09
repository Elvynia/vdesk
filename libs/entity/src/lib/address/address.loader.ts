import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloader } from "../util/make-data-loader";
import { AddressRepository } from "./address.repository";

@DataloaderProvider()
export class AddressLoader {

	constructor(
		private repository: AddressRepository
	) { }

	createDataloader() {
		return makeDataloader(this.repository);
	}
}
