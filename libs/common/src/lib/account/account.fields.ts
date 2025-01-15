import { roleFields } from "../role/role.fields";

export const accountFields = [
	'_id',
	'creationDate',
	'email',
	'enabled',
	'username',
	`role {
		${roleFields.join('\n')}
	}`
];
