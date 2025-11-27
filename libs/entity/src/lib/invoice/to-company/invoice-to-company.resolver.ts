import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { CompanyEntity } from '../../company/company.entity';
import { CompanyRepository } from '../../company/company.repository';
import { InvoiceEntity } from '../../invoice/invoice.entity';

@Resolver(() => InvoiceEntity)
export class InvoiceToCompanyResolver implements OnModuleInit {
	private companyRepository: CompanyRepository;

	constructor(
		private readonly moduleRef: ModuleRef
	) { }

	onModuleInit() {
		this.companyRepository = this.moduleRef.get(CompanyRepository, { strict: false });
	}

	@ResolveField(() => CompanyEntity)
	company(@Parent() invoice: InvoiceEntity) {
		return this.companyRepository.findOne(invoice.companyId);
	}
}
