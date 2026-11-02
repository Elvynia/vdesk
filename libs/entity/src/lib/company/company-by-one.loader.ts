import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderByOne } from "../util/make-data-loader";
import { CompanyRepository } from "./company.repository";

@DataloaderProvider()
export class CompanyByOneLoader {

	constructor(
		private repository: CompanyRepository
	) { }

	createDataloader() {
		return makeDataloaderByOne(this.repository);
	}
}
