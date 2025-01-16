import {
	Resolver,
	Query,
	Mutation,
	Args,
	Parent,
	ResolveField,
} from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CompanyEntity, CompanyCreate, CompanyUpdate } from './company.entity';

import { CompanyTypeService } from '../company-type/company-type.service';
import { CompanyTypeEntity } from '../company-type/company-type.entity';

import { AddressService } from '../address/address.service';
import { AddressEntity } from '../address/address.entity';

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
