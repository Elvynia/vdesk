import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressEntity, AddressSchema } from './address.entity';

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
	providers: [AddressResolver, AddressService],
	exports: [AddressResolver, AddressService],
})
export class AddressModule {}
