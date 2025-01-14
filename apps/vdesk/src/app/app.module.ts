import { AuthModule, EntityModule } from '@lv/entity';
import { Module } from '@nestjs/common';
import { AddressModule } from "@lv/entity";

@Module({
	imports: [
		EntityModule,
		AuthModule,
        AddressModule
    ],
})
export class AppModule { }
