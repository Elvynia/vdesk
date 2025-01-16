import { IEntity } from '../entity/entity.type';

import { CompanyType } from '../company-type/company-type.type';

import { Address } from '../address/address.type';

export interface Company extends IEntity {
	name: string;

	identifier: string;

	type: CompanyType;

	address?: Address;
}

export interface CompanyState {
	companies: Record<string, Company>;
}

export const selectCompanies = (state: CompanyState) => state.companies;
