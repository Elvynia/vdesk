import { AddressModule, AuthModule, ChunkModule, ChunkToMissionModule, CompanyModule, CompanyTypeModule, EntityModule, InvoiceModule, MissionModule, MissionToChunkModule, MissionToCompanyModule, RoleModule } from '@lv/entity';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		EntityModule,
		AuthModule,
		AddressModule,
		CompanyTypeModule,
		CompanyModule,
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
})
export class AppModule { }
