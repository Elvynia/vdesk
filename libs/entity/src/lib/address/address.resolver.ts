import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

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
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.addressService.findOne(id);
	}

	@Mutation(() => AddressEntity)
	updateAddress(
		@Args('updateAddressInput') updateAddressInput: AddressEntity
	) {
		return this.addressService.update(
			updateAddressInput.id,
			updateAddressInput
		);
	}

	@Mutation(() => AddressEntity)
	removeAddress(@Args('id', { type: () => Int }) id: number) {
		return this.addressService.remove(id);
	}
}
