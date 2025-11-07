import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
	Int,
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { InvoiceRepository } from '../../invoice/invoice.repository';
import { CompanyEntity } from '../company.entity';

@Resolver(() => CompanyEntity)
export class CompanyToInvoiceResolver implements OnModuleInit {
	private invoiceRepository: InvoiceRepository;

	constructor(
		private readonly moduleRef: ModuleRef
	) { }

	onModuleInit() {
		this.invoiceRepository = this.moduleRef.get(InvoiceRepository, { strict: false });
	}

	@ResolveField(() => Int)
	invoiceCount(@Parent() company: CompanyEntity) {
		return this.invoiceRepository.getYearCount(company._id.toString());
	}
}
