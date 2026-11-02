import { DataloaderProvider } from "@tracworx/nestjs-dataloader";
import DataLoader from "dataloader";
import { InvoiceRepository } from "./invoice.repository";

@DataloaderProvider()
export class InvoiceCountLoader {

	constructor(
		private repository: InvoiceRepository
	) { }

	createDataloader() {
		return new DataLoader<string, number>(
			async (keys) => {
				const results = new Map(
					(await this.repository.countByParentIds(keys)).map((r) => [r.companyId, r.count])
				);
				return keys.map((k) => results.get(k) || 0);
			},
			{
				cache: false
			}
		);
	}
}
