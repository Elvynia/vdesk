import {
    Args,
    Mutation,
    Query,
    Resolver
} from '@nestjs/graphql';
import { AddressCreate, AddressEntity, AddressUpdate } from './address.entity';
import { AddressService } from './address.service';

@Resolver(() => AddressEntity)
export class AddressResolver {
	constructor(private readonly addressService: AddressService) {}

	@Mutation(() => AddressEntity)
	createAddress(
		@Args('createAddressInput') createAddressInput: AddressCreate
	) {
		return this.addressService.create(createAddressInput);
	}

	@Query(() => [AddressEntity], { name: 'address' })
	findAll() {
		return this.addressService.findAll();
	}

	@Query(() => AddressEntity, { name: 'addressId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.addressService.findOne(id);
	}

	@Mutation(() => AddressEntity)
	updateAddress(
		@Args('updateAddressInput') updateAddressInput: AddressUpdate
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
