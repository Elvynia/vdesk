import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';

@Resolver(() => AddressEntity)
@UseGuards(AuthGuard)
export class AddressResolver {
	constructor(private readonly addressService: AddressService) { }

	@Mutation(() => AddressEntity)
	createAddress(
		@Args('createAddressInput') createAddressInput: AddressEntity
	) {
		return this.addressService.create(createAddressInput);
	}

	@Query(() => [AddressEntity], { name: 'address' })
	findAll() {
		return this.addressService.findAll();
	}

	@Query(() => AddressEntity, { name: 'addressId' })
	findOne(@Args('id', { type: () => Int }) id: string) {
		return this.addressService.findOne(id);
	}

	@Mutation(() => AddressEntity)
	updateAddress(
		@Args('updateAddressInput') updateAddressInput: AddressEntity
	) {
		return this.addressService.update(
			updateAddressInput._id,
			updateAddressInput
		);
	}

	@Mutation(() => AddressEntity)
	removeAddress(@Args('id', { type: () => String }) id: string) {
		return this.addressService.remove(id);
	}
}
