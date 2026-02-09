import { makeInvoiceDateExecution } from "@lv/common";
import { InvoiceRepository } from "@lv/entity";
import { Controller, Get, Param, Render } from "@nestjs/common";
import { ErrorWithProps } from "mercurius";

@Controller('invoice/pdf')
export class InvoicePdfController {

	constructor(
		private invoiceRepo: InvoiceRepository
	) { }

	@Get('/:id')
	@Render('invoice/print.hbs')
	async print(@Param('id') id: string) {
		const invoiceDoc = await this.invoiceRepo.findOnePrint(id);
		if (!invoiceDoc) {
			throw new ErrorWithProps('Invoice not found', undefined, 404);
		}
		const invoice = invoiceDoc.toJSON();
		const dateExecution = makeInvoiceDateExecution(invoice);
		return {
			invoice,
			dateExecution
		};
	}
}
