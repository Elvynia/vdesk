import { AddressModule, AuthModule, EntityModule } from '@lv/entity';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		EntityModule,
		AuthModule,
		AddressModule
	],
})
export class AppModule { }
