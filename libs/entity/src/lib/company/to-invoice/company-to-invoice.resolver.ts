import {
	Int,
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { InvoiceByManyLoader } from '../../invoice/invoice-by-many.loader';
import { InvoiceCountLoader } from '../../invoice/invoice-count.loader';
import { InvoiceEntity } from '../../invoice/invoice.entity';
import { CompanyEntity } from '../company.entity';

@Resolver(() => CompanyEntity)
export class CompanyToInvoiceResolver {

	@ResolveField(() => [InvoiceEntity])
	invoices(
		@Parent() company: CompanyEntity,
		@Loader(InvoiceByManyLoader) loader: DataLoader<string, InvoiceEntity>
	) {
		return loader.load(company._id.toString());
	}

	@ResolveField(() => Int)
	invoiceCount(
		@Parent() company: CompanyEntity,
		@Loader(InvoiceCountLoader) loader: DataLoader<string, number>
	) {
		return loader.load(company._id.toString());
	}
}
