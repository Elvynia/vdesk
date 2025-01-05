import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Address)
@UseGuards(AuthGuard)
export class AddressResolver {
	constructor(private readonly addressService: AddressService) { }

	@Mutation(() => Address)
	createAddress(
		@Args('createAddressInput') createAddressInput: Address
	) {
		return this.addressService.create(createAddressInput);
	}

	@Query(() => [Address], { name: 'address' })
	findAll() {
		return this.addressService.findAll();
	}

	@Query(() => Address, { name: 'addressId' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.addressService.findOne(id);
	}

	@Mutation(() => Address)
	updateAddress(
		@Args('updateAddressInput') updateAddressInput: Address
	) {
		return this.addressService.update(
			updateAddressInput.id,
			updateAddressInput
		);
	}

	@Mutation(() => Address)
	removeAddress(@Args('id', { type: () => Int }) id: number) {
		return this.addressService.remove(id);
	}
}
