import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloader } from "../util/make-data-loader";
import { CompanyTypeRepository } from "./company-type.repository";

@DataloaderProvider()
export class CompanyTypeLoader {

	constructor(
		private repository: CompanyTypeRepository
	) { }

	createDataloader() {
		return makeDataloader(this.repository);
	}
}
