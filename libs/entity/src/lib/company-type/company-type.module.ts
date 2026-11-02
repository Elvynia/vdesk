import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyTypeByOneLoader } from './company-type-by-one.loader';
import { CompanyTypeEntity, CompanyTypeSchema } from './company-type.entity';
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
		CompanyTypeByOneLoader,
		CompanyTypeResolver,
		CompanyTypeRepository
	],
	exports: [
		CompanyTypeByOneLoader,
		CompanyTypeResolver,
		CompanyTypeRepository
	],
})
export class CompanyTypeModule { }
