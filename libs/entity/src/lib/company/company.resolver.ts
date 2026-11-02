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
import { AddressByOneLoader } from '../address/address-by-one.loader';
import { AddressEntity } from '../address/address.entity';
import { CompanyTypeByOneLoader } from '../company-type/company-type-by-one.loader';
import { CompanyTypeEntity } from '../company-type/company-type.entity';
import { CompanyCreateEntity, CompanyEntity, CompanyPatchEntity } from './company.entity';
import { CompanyRepository } from './company.repository';

@Resolver(() => CompanyEntity)
export class CompanyResolver {
	constructor(
		private readonly companyRepository: CompanyRepository,
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
		@Loader(CompanyTypeByOneLoader) loader: DataLoader<string, CompanyTypeEntity>
	) {
		return loader.load(parent.typeId);
	}

	@ResolveField(() => AddressEntity, { nullable: true })
	address(
		@Parent() parent: CompanyEntity,
		@Loader(AddressByOneLoader) loader: DataLoader<string, AddressEntity>
	) {
		return parent.addressId ? loader.load(parent.addressId) : null;
	}
}
