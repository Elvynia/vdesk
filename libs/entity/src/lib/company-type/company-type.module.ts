import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyTypeEntity, CompanyTypeSchema } from './company-type.entity';
import { CompanyTypeResolver } from './company-type.resolver';
import { CompanyTypeService } from './company-type.service';

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
