import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderToMany } from "../util/make-data-loader";
import { InvoiceRepository } from "./invoice.repository";

@DataloaderProvider()
export class InvoiceLoader {

	constructor(
		private repository: InvoiceRepository
	) { }

	createDataloader() {
		return makeDataloaderToMany(this.repository, 'companyId');
	}
}
