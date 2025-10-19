import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyEntity, CompanySchema } from './company.entity';
import { CompanyResolver } from './company.resolver';
import { CompanyRepository } from './company.repository';

import { CompanyTypeModule } from '../company-type/company-type.module';

import { AddressModule } from '../address/address.module';

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
	providers: [CompanyResolver, CompanyRepository],
	exports: [CompanyResolver, CompanyRepository],
})
export class CompanyModule {}
