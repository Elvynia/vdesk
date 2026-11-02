import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from '../address/address.module';
import { CompanyTypeModule } from '../company-type/company-type.module';
import { CompanyByOneLoader } from './company-by-one.loader';
import { CompanyEntity, CompanySchema } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CompanyResolver } from './company.resolver';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: CompanyEntity.name,
				schema: CompanySchema,
				collection: 'company',
			},
		]),
		CompanyTypeModule,
		AddressModule,
	],
	providers: [
		CompanyByOneLoader,
		CompanyRepository,
		CompanyResolver,
	],
	exports: [
		CompanyByOneLoader,
		CompanyRepository,
		CompanyResolver,
	],
})
export class CompanyModule { }
