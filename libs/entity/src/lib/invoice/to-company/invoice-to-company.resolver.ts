import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { CompanyByOneLoader } from '../../company/company-by-one.loader';
import { CompanyEntity } from '../../company/company.entity';
import { InvoiceEntity } from '../../invoice/invoice.entity';

@Resolver(() => InvoiceEntity)
export class InvoiceToCompanyResolver {

	@ResolveField(() => CompanyEntity)
	company(
		@Parent() invoice: InvoiceEntity,
		@Loader(CompanyByOneLoader) loader: DataLoader<string, CompanyEntity>
	) {
		return loader.load(invoice.companyId);
	}
}
