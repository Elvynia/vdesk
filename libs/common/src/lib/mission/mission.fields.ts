import { chunkFields } from "../chunk/chunk.fields";

export const missionFields = [
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
	}`
];
