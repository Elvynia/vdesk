import {
    Args,
    Mutation,
    Query,
    Resolver
} from '@nestjs/graphql';
import {
    CompanyTypeCreate,
    CompanyTypeEntity,
    CompanyTypeUpdate,
} from './company-type.entity';
import { CompanyTypeService } from './company-type.service';

@Resolver(() => CompanyTypeEntity)
export class CompanyTypeResolver {
	constructor(private readonly companyTypeService: CompanyTypeService) {}

	@Mutation(() => CompanyTypeEntity)
	createCompanyType(
		@Args('createCompanyTypeInput')
		createCompanyTypeInput: CompanyTypeCreate
	) {
		return this.companyTypeService.create(createCompanyTypeInput);
	}

	@Query(() => [CompanyTypeEntity], { name: 'companyType' })
	findAll() {
		return this.companyTypeService.findAll();
	}

	@Query(() => CompanyTypeEntity, { name: 'companyTypeId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.companyTypeService.findOne(id);
	}

	@Mutation(() => CompanyTypeEntity)
	updateCompanyType(
		@Args('updateCompanyTypeInput')
		updateCompanyTypeInput: CompanyTypeUpdate
	) {
		return this.companyTypeService.update(
			updateCompanyTypeInput._id,
			updateCompanyTypeInput
		);
	}

	@Mutation(() => CompanyTypeEntity)
	removeCompanyType(@Args('id', { type: () => String }) id: string) {
		return this.companyTypeService.remove(id);
	}
}
