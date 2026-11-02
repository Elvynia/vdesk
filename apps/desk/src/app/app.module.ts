import { AddressModule, AuthModule, ChunkModule, ChunkToMissionResolver, CompanyModule, CompanyToInvoiceResolver, CompanyToMissionResolver, CompanyTypeModule, EntityModule, InvoiceModule, InvoiceToCompanyResolver, MissionModule, MissionToChunkResolver, MissionToCompanyResolver, RoleModule } from '@lv/entity';
import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { InvoicePdfController } from './invoice/invoice-pdf.controller';
import { InvoicePrintController } from './invoice/invoice-print.controller';

@Module({
	imports: [
		EntityModule,
		AuthModule,
		AddressModule,
		CompanyTypeModule,
		CompanyModule,
		HealthModule,
		RoleModule,
		AddressModule,
		CompanyModule,
		MissionModule,
		ChunkModule,
		InvoiceModule
	],
	controllers: [
		InvoicePdfController,
		InvoicePrintController
	],
	providers: [
		ChunkToMissionResolver,
		CompanyToInvoiceResolver,
		CompanyToMissionResolver,
		InvoiceToCompanyResolver,
		MissionToCompanyResolver,
		MissionToChunkResolver,
	]
})
export class AppModule { }
