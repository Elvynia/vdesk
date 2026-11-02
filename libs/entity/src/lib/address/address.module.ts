import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressByOneLoader } from './address-by-one.loader';
import { AddressEntity, AddressSchema } from './address.entity';
import { AddressRepository } from './address.repository';
import { AddressResolver } from './address.resolver';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: AddressEntity.name,
				schema: AddressSchema,
				collection: 'address',
			},
		]),
	],
	providers: [
		AddressByOneLoader,
		AddressResolver,
		AddressRepository
	],
	exports: [
		AddressByOneLoader,
		AddressResolver,
		AddressRepository
	],
})
export class AddressModule { }
