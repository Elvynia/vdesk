import { AuthModule, EntityModule } from '@lv/entity';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		EntityModule,
		AuthModule
	],
})
export class AppModule { }
