import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { CompanyCreateEntity, CompanyEntity, CompanyUpdateEntity } from './company.entity';
import { CompanyRepository } from './company.repository';

import { CompanyTypeEntity } from '../company-type/company-type.entity';
import { CompanyTypeRepository } from '../company-type/company-type.repository';

import { AddressEntity } from '../address/address.entity';
import { AddressRepository } from '../address/address.repository';

@Resolver(() => CompanyEntity)
export class CompanyResolver {
	constructor(
		private readonly companyRepository: CompanyRepository,

		private companyTypeRepository: CompanyTypeRepository,

		private addressRepository: AddressRepository
	) { }

	@Mutation(() => CompanyEntity)
	createCompany(
		@Args('createCompanyInput') createCompanyInput: CompanyCreateEntity
	) {
		return this.companyRepository.create(createCompanyInput);
	}

	@Query(() => [CompanyEntity], { name: 'company' })
	findAll() {
		return this.companyRepository.findAll();
	}

	@Query(() => CompanyEntity, { name: 'companyId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.companyRepository.findOne(id);
	}

	@Mutation(() => CompanyEntity)
	updateCompany(
		@Args('updateCompanyInput') updateCompanyInput: CompanyUpdateEntity
	) {
		return this.companyRepository.update(
			updateCompanyInput._id,
			updateCompanyInput
		);
	}

	@Mutation(() => CompanyEntity)
	removeCompany(@Args('id', { type: () => String }) id: string) {
		return this.companyRepository.remove(id);
	}

	@ResolveField(() => CompanyTypeEntity)
	async type(@Parent() parent: CompanyEntity) {
		return await this.companyTypeRepository.findOne(parent.type as any);
	}

	@ResolveField(() => AddressEntity)
	async address(@Parent() parent: CompanyEntity) {
		return await this.addressRepository.findOne(parent.address as any);
	}
}
