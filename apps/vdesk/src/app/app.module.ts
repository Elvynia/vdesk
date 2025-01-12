import { AddressModule, AuthModule, EntityModule, RoleModule } from '@lv/entity';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		EntityModule,
		AuthModule,
		AddressModule,
		RoleModule
	],
})
export class AppModule { }
