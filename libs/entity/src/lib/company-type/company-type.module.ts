import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyTypeEntity, CompanyTypeSchema } from './company-type.entity';
import { CompanyTypeResolver } from './company-type.resolver';
import { CompanyTypeRepository } from './company-type.repository';

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
	providers: [CompanyTypeResolver, CompanyTypeRepository],
	exports: [CompanyTypeResolver, CompanyTypeRepository],
})
export class CompanyTypeModule {}
