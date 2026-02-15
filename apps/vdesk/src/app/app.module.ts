import { AddressModule, AuthModule, ChunkModule, ChunkToMissionModule, CompanyModule, CompanyToInvoiceModule, CompanyTypeModule, EntityModule, InvoiceModule, MissionModule, MissionToChunkModule, MissionToCompanyModule, RoleModule } from '@lv/entity';
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
		CompanyToInvoiceModule,
		HealthModule,
		RoleModule,
		AddressModule,
		CompanyModule,
		MissionModule,
		ChunkModule,
		ChunkToMissionModule,
		MissionToChunkModule,
		MissionToCompanyModule,
		InvoiceModule
	],
	controllers: [
		InvoicePdfController,
		InvoicePrintController
	],
})
export class AppModule { }
