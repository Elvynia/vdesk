import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressEntity, AddressSchema } from './address.entity';
import { AddressLoader } from './address.loader';
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
		AddressLoader,
		AddressResolver,
		AddressRepository
	],
	exports: [
		AddressLoader,
		AddressResolver,
		AddressRepository
	],
})
export class AddressModule { }
