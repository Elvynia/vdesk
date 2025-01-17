import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyEntity, CompanySchema } from './company.entity';

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
	providers: [CompanyResolver, CompanyService],
	exports: [CompanyResolver, CompanyService],
})
export class CompanyModule {}
