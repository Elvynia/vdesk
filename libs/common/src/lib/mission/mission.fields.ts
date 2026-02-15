import { chunkFields } from "../chunk/chunk.fields";

export function makeMissionFields() {
	return [
		'_id',
		'name',
		'rate',
		'byDay',
		'dayLength',
		'start',
		'end',
		'desc',
		`chunks {
		${chunkFields.join('\n')}
	}`,
		'companyId'
	]
};
