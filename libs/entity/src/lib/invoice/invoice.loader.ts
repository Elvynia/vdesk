import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloader } from "../util/make-data-loader";
import { InvoiceRepository } from "./invoice.repository";

@DataloaderProvider()
export class InvoiceLoader {

	constructor(
		private repository: InvoiceRepository
	) { }

	createDataloader() {
		return makeDataloader(this.repository);
	}
}
