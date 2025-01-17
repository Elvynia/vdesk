import { Module } from '@nestjs/common';
import { CompanyTypeService } from './company-type.service';
import { CompanyTypeResolver } from './company-type.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyTypeEntity, CompanyTypeSchema } from './company-type.entity';

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
	providers: [CompanyTypeResolver, CompanyTypeService],
	exports: [CompanyTypeResolver, CompanyTypeService],
})
export class CompanyTypeModule {}
