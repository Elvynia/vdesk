import {
    Args,
    Mutation,
    Query,
    Resolver
} from '@nestjs/graphql';
import {
    CompanyTypeCreateEntity,
    CompanyTypeEntity,
    CompanyTypeUpdateEntity,
} from './company-type.entity';
import { CompanyTypeRepository } from './company-type.repository';

@Resolver(() => CompanyTypeEntity)
export class CompanyTypeResolver {
	constructor(private readonly companyTypeRepository: CompanyTypeRepository) {}

	@Mutation(() => CompanyTypeEntity)
	createCompanyType(
		@Args('createCompanyTypeInput')
		createCompanyTypeInput: CompanyTypeCreateEntity
	) {
		return this.companyTypeRepository.create(createCompanyTypeInput);
	}

	@Query(() => [CompanyTypeEntity], { name: 'companyType' })
	findAll() {
		return this.companyTypeRepository.findAll();
	}

	@Query(() => CompanyTypeEntity, { name: 'companyTypeId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.companyTypeRepository.findOne(id);
	}

	@Mutation(() => CompanyTypeEntity)
	updateCompanyType(
		@Args('updateCompanyTypeInput')
		updateCompanyTypeInput: CompanyTypeUpdateEntity
	) {
		return this.companyTypeRepository.update(
			updateCompanyTypeInput._id,
			updateCompanyTypeInput
		);
	}

	@Mutation(() => CompanyTypeEntity)
	removeCompanyType(@Args('id', { type: () => String }) id: string) {
		return this.companyTypeRepository.remove(id);
	}
}
