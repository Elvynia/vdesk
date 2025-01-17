import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { CompanyCreate, CompanyEntity, CompanyUpdate } from './company.entity';
import { CompanyService } from './company.service';

import { CompanyTypeEntity } from '../company-type/company-type.entity';
import { CompanyTypeService } from '../company-type/company-type.service';

import { AddressEntity } from '../address/address.entity';
import { AddressService } from '../address/address.service';

@Resolver(() => CompanyEntity)
export class CompanyResolver {
	constructor(
		private readonly companyService: CompanyService,

		private companyTypeService: CompanyTypeService,

		private addressService: AddressService
	) {}

	@Mutation(() => CompanyEntity)
	createCompany(
		@Args('createCompanyInput') createCompanyInput: CompanyCreate
	) {
		return this.companyService.create(createCompanyInput);
	}

	@Query(() => [CompanyEntity], { name: 'company' })
	findAll() {
		return this.companyService.findAll();
	}

	@Query(() => CompanyEntity, { name: 'companyId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.companyService.findOne(id);
	}

	@Mutation(() => CompanyEntity)
	updateCompany(
		@Args('updateCompanyInput') updateCompanyInput: CompanyUpdate
	) {
		return this.companyService.update(
			updateCompanyInput._id,
			updateCompanyInput
		);
	}

	@Mutation(() => CompanyEntity)
	removeCompany(@Args('id', { type: () => String }) id: string) {
		return this.companyService.remove(id);
	}

	@ResolveField(() => CompanyTypeEntity)
	async type(@Parent() parent: CompanyEntity) {
		return await this.companyTypeService.findOne(parent.type as any);
	}

	@ResolveField(() => AddressEntity)
	async address(@Parent() parent: CompanyEntity) {
		return await this.addressService.findOne(parent.address as any);
	}
}
