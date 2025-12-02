import { InvoiceRepository } from "@lv/entity";
import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import puppeteer from 'puppeteer';

@Controller('invoice/print')
export class InvoicePrintController {

	constructor(
		private invoiceRepo: InvoiceRepository
	) { }

	@Get('/:id')
	async print(
		@Param('id') id: string,
		@Req() req: FastifyRequest,
		@Res() res: FastifyReply
	) {
		const invoiceDoc = await this.invoiceRepo.findOne(id);
		if (!invoiceDoc) {
			throw new Error('Invoice not found');
		}
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		page.setExtraHTTPHeaders({
			'Authorization': req.headers.authorization
		});
		await page.goto('http://localhost:3000/invoice/pdf/' + id, {
			waitUntil: 'networkidle2',
		});
		const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
		await browser.close();
		res.headers({
			'content-disposition': `attachment; filename="${invoiceDoc.name}.pdf"`,
			'Access-Control-Expose-Headers': 'Content-Disposition'
		}).send(pdfBuffer);
	}
}
