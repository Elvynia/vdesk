import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Loader } from '@tracworx/nestjs-dataloader';
import DataLoader from 'dataloader';
import { AddressEntity } from '../address/address.entity';
import { AddressLoader } from '../address/address.loader';
import { AddressRepository } from '../address/address.repository';
import { CompanyTypeEntity } from '../company-type/company-type.entity';
import { CompanyTypeLoader } from '../company-type/company-type.loader';
import { CompanyTypeRepository } from '../company-type/company-type.repository';
import { CompanyCreateEntity, CompanyEntity, CompanyPatchEntity } from './company.entity';
import { CompanyRepository } from './company.repository';

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
	patchCompany(
		@Args('patchCompanyInput') patchCompanyInput: CompanyPatchEntity
	) {
		return this.companyRepository.patch(
			patchCompanyInput._id,
			patchCompanyInput
		);
	}

	@Mutation(() => CompanyEntity)
	removeCompany(@Args('id', { type: () => String }) id: string) {
		return this.companyRepository.remove(id);
	}

	@ResolveField(() => CompanyTypeEntity)
	type(
		@Parent() parent: CompanyEntity,
		@Loader(CompanyTypeLoader) loader: DataLoader<string, CompanyTypeEntity>
	) {
		return loader.load(parent.typeId);
	}

	@ResolveField(() => AddressEntity, { nullable: true })
	address(
		@Parent() parent: CompanyEntity,
		@Loader(AddressLoader) loader: DataLoader<string, AddressEntity>
	) {
		return parent.addressId ? loader.load(parent.addressId) : null;
	}
}
