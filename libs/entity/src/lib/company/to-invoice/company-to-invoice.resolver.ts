import {
	Int,
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { InvoiceEntity } from '../../invoice/invoice.entity';
import { InvoiceLoader } from '../../invoice/invoice.loader';
import { CompanyEntity } from '../company.entity';

@Resolver(() => CompanyEntity)
export class CompanyToInvoiceResolver {

	@ResolveField(() => Int)
	invoiceCount(
		@Parent() company: CompanyEntity,
		@Loader(InvoiceLoader) loader: DataLoader<string, InvoiceEntity>
	) {
		return loader.load(company._id.toString());
	}
}
