import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyTypeEntity, CompanyTypeSchema } from './company-type.entity';
import { CompanyTypeLoader } from './company-type.loader';
import { CompanyTypeRepository } from './company-type.repository';
import { CompanyTypeResolver } from './company-type.resolver';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: CompanyTypeEntity.name,
				schema: CompanyTypeSchema,
				collection: 'company-type',
			},
		]),
	],
	providers: [
		CompanyTypeLoader,
		CompanyTypeResolver,
		CompanyTypeRepository
	],
	exports: [
		CompanyTypeLoader,
		CompanyTypeResolver,
		CompanyTypeRepository
	],
})
export class CompanyTypeModule { }
