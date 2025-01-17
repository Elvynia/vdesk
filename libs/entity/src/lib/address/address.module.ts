import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressEntity, AddressSchema } from './address.entity';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

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
