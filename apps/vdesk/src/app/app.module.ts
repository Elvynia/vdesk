import { AddressModule, AuthModule, ChunkModule, ChunkToMissionModule, CompanyModule, CompanyTypeModule, EntityModule, MissionModule, MissionToChunkModule, RoleModule } from '@lv/entity';
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
		MissionToChunkModule
	],
})
export class AppModule { }
