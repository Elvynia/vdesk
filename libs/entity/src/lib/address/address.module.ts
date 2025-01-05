import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Address, AddressSchema } from './address.entity';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({

	imports: [
		AuthModule,
		MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema, collection: 'address' }])
	],
	providers: [AddressResolver, AddressService],
})
export class AddressModule { }
