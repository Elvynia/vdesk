import { Address } from '../address/address.type';
import { CompanyType } from '../company-type/company-type.type';
import { Mission } from '../mission/mission.type';
import { IEntity } from '../util/entity.type';

export interface Company extends IEntity {
	name: string;

	identifier: string;

	invoiceCount?: number;

	shortName?: string;

	taxNumber?: string;

	trigram: string;

	typeId: string;

	addressId?: string;

	missions?: Mission[];
}

export interface CompanyRead extends Company {

	address?: Address;

	type: CompanyType;
}

export type CompanyCreate = Omit<Company, '_id' | 'invoiceCount' | 'type' | 'address'>;
export type CompanyPatch = Partial<CompanyCreate> & IEntity;

export interface CompanyState {
	companies: Record<string, CompanyRead>;
}

export const selectCompanies = (state: CompanyState) => state.companies;
