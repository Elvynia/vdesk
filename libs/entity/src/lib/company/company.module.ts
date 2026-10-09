import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from '../address/address.module';
import { CompanyTypeModule } from '../company-type/company-type.module';
import { CompanyEntity, CompanySchema } from './company.entity';
import { CompanyLoader } from './company.loader';
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
		CompanyLoader,
		CompanyRepository,
		CompanyResolver,
	],
	exports: [
		CompanyLoader,
		CompanyRepository,
		CompanyResolver,
	],
})
export class CompanyModule { }
