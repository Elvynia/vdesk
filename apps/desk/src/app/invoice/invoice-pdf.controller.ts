import { companyFields, Invoice, invoiceFields, makeInvoiceDateExecution } from "@lv/common";
import { Controller, Get, InternalServerErrorException, Param, Render, Req } from "@nestjs/common";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { graphql } from "graphql";

@Controller('invoice/pdf')
export class InvoicePdfController {

	constructor(
		private readonly schemaHost: GraphQLSchemaHost
	) { }

	@Get('/:id')
	@Render('invoice/print.hbs')
	async print(@Param('id') id: string, @Req() req: Request) {
		const result = (await graphql({
			schema: this.schemaHost.schema,
			source: `
			{
				invoiceId(id: "${id}") {
					${invoiceFields.join('\n')}
					company {
						${companyFields.join('\n')}
					}
				}
			}
			`,
			variableValues: {
				id
			},
			contextValue: {
				req
			}
		}));
		if (result.errors?.length) {
			console.error('InvoicePdfController - GraphQL errors: ', result.errors);
			throw new InternalServerErrorException(result.errors[0].message);
		}
		const invoice = result.data.invoiceId as Invoice;
		invoice.createdOn = invoice.createdOn ? new Date(invoice.createdOn) : null;
		invoice.execStart = invoice.execStart ? new Date(invoice.execStart) : null;
		invoice.execEnd = invoice.execEnd ? new Date(invoice.execEnd) : null;
		invoice.paymentLimit = invoice.paymentLimit ? new Date(invoice.paymentLimit) : null;
		const dateExecution = makeInvoiceDateExecution(invoice);
		return {
			invoice,
			dateExecution
		};
	}
}
