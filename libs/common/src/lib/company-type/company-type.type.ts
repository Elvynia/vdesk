import { IEntity } from '../util/entity.type';

export interface CompanyType extends IEntity {
	name: string;

	identifierLabel: string;

	currency: string;
}

export interface CompanyTypeState {
	companyTypes: Record<string, CompanyType>;
}

export const selectCompanyTypes = (state: CompanyTypeState) =>
	state.companyTypes;
