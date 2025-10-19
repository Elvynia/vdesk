import { companyTypeFields } from '../company-type/company-type.fields';

import { addressFields } from '../address/address.fields';

export const companyFields = [
	'_id',
	'name',
	'identifier',
	`type {
		${companyTypeFields.join('\n')}
	}`,
	`address {
		${addressFields.join('\n')}
	}`,
];
