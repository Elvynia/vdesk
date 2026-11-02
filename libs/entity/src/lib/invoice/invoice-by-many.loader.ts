import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderByMany } from "../util/make-data-loader";
import { InvoiceRepository } from "./invoice.repository";

@DataloaderProvider()
export class InvoiceByManyLoader {

	constructor(
		private repository: InvoiceRepository
	) { }

	createDataloader() {
		return makeDataloaderByMany(this.repository, 'companyId');
	}
}
