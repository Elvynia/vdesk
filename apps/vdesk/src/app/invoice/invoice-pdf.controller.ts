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
		const invoice = (await this.invoiceRepo.findOne(id)).toJSON();
		if (!invoice) {
			throw new Error('Invoice not found')
		}
		return {
			invoice
		};
	}
}
