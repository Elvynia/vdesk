import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressEntity, AddressSchema } from './address.entity';
import { AddressResolver } from './address.resolver';
import { AddressRepository } from './address.repository';

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
	providers: [AddressResolver, AddressRepository],
	exports: [AddressResolver, AddressRepository],
})
export class AddressModule {}
