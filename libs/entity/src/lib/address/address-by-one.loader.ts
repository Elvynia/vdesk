import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderByOne } from "../util/make-data-loader";
import { AddressRepository } from "./address.repository";

@DataloaderProvider()
export class AddressByOneLoader {

	constructor(
		private repository: AddressRepository
	) { }

	createDataloader() {
		return makeDataloaderByOne(this.repository);
	}
}
