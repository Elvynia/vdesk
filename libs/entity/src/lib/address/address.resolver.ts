import {
	Args,
	Mutation,
	Query,
	Resolver
} from '@nestjs/graphql';
import { AddressCreateEntity, AddressEntity, AddressPatchEntity } from './address.entity';
import { AddressRepository } from './address.repository';

@Resolver(() => AddressEntity)
export class AddressResolver {
	constructor(private readonly addressRepository: AddressRepository) { }

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
	patchAddress(
		@Args('patchAddressInput') patchAddressInput: AddressPatchEntity
	) {
		return this.addressRepository.patch(
			patchAddressInput._id,
			patchAddressInput
		);
	}

	@Mutation(() => AddressEntity)
	removeAddress(@Args('id', { type: () => String }) id: string) {
		return this.addressRepository.remove(id);
	}
}
