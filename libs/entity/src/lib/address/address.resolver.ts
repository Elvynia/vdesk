import {
    Args,
    Mutation,
    Query,
    Resolver
} from '@nestjs/graphql';
import { AddressCreateEntity, AddressEntity, AddressUpdateEntity } from './address.entity';
import { AddressRepository } from './address.repository';

@Resolver(() => AddressEntity)
export class AddressResolver {
	constructor(private readonly addressRepository: AddressRepository) {}

	@Mutation(() => AddressEntity)
	createAddress(
		@Args('createAddressInput') createAddressInput: AddressCreateEntity
	) {
		return this.addressRepository.create(createAddressInput);
	}

	@Query(() => [AddressEntity], { name: 'address' })
	findAll() {
		return this.addressRepository.findAll();
	}

	@Query(() => AddressEntity, { name: 'addressId' })
	findOne(@Args('id', { type: () => String }) id: string) {
		return this.addressRepository.findOne(id);
	}

	@Mutation(() => AddressEntity)
	updateAddress(
		@Args('updateAddressInput') updateAddressInput: AddressUpdateEntity
	) {
		return this.addressRepository.update(
			updateAddressInput._id,
			updateAddressInput
		);
	}

	@Mutation(() => AddressEntity)
	removeAddress(@Args('id', { type: () => String }) id: string) {
		return this.addressRepository.remove(id);
	}
}
