import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { CompanyEntity } from '../../company/company.entity';
import { CompanyLoader } from '../../company/company.loader';
import { InvoiceEntity } from '../../invoice/invoice.entity';

@Resolver(() => InvoiceEntity)
export class InvoiceToCompanyResolver {

	@ResolveField(() => CompanyEntity)
	company(
		@Parent() invoice: InvoiceEntity,
		@Loader(CompanyLoader) loader: DataLoader<string, CompanyEntity>
	) {
		return loader.load(invoice.companyId);
	}
}
