import { AddressModule, AuthModule, CompanyModule, CompanyTypeModule, EntityModule, MissionModule, RoleModule } from '@lv/entity';
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
        MissionModule
    ],
})
export class AppModule { }
