import { Module } from '@nestjs/common';
import { CompanyToInvoiceResolver } from './company-to-invoice.resolver';

@Module({
	providers: [CompanyToInvoiceResolver],
	exports: [CompanyToInvoiceResolver],
})
export class CompanyToInvoiceModule { }
