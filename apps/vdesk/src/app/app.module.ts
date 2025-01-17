import { AddressModule, AuthModule, CompanyModule, CompanyTypeModule, EntityModule, RoleModule } from '@lv/entity';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		EntityModule,
		AuthModule,
        AddressModule,
        CompanyTypeModule,
        CompanyModule,
        RoleModule
    ],
})
export class AppModule { }
