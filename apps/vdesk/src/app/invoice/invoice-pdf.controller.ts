import { makeInvoiceDateExecution } from "@lv/common";
import { InvoiceRepository, MappingPublic } from "@lv/entity";
import { Controller, Get, Param, Render } from "@nestjs/common";

// FIXME: Remove after testing
@MappingPublic()
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
			throw new Error('Invoice not found')
		}
		const invoice = invoiceDoc.toJSON();
		const dateExecution = makeInvoiceDateExecution(invoice);
		return {
			invoice,
			dateExecution
		};
	}
}
