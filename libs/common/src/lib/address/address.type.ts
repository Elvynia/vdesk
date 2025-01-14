import { IEntity } from '../entity/entity.type';

export interface Address extends IEntity {
	city: string;

	firstname?: string;

	lastname: string;

	line1: string;

	line2?: string;

	zip: string;
}

export interface AddressState {
	addresses: Record<string, Address>;
}

export const selectAddresses = (state: AddressState) => state.addresses;
