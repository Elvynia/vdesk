import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloaderByOne } from "../util/make-data-loader";
import { CompanyTypeRepository } from "./company-type.repository";

@DataloaderProvider()
export class CompanyTypeByOneLoader {

	constructor(
		private repository: CompanyTypeRepository
	) { }

	createDataloader() {
		return makeDataloaderByOne(this.repository);
	}
}
