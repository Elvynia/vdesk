import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import { makeDataloader } from "../util/make-data-loader";
import { CompanyRepository } from "./company.repository";
import { CompanyEntity } from "./company.entity";

@DataloaderProvider()
export class CompanyLoader {

	constructor(
		private repository: CompanyRepository
	) { }

	createDataloader() {
		return makeDataloader(this.repository);
	}
}
