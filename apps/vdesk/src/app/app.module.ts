import { AddressModule, AuthModule, CompanyModule, CompanyTypeModule, EntityModule } from '@lv/entity';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		EntityModule,
		AuthModule,
        AddressModule,
        CompanyTypeModule,
        CompanyModule
    ],
})
export class AppModule { }
