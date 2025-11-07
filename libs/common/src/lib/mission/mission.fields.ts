import { chunkFields } from "../chunk/chunk.fields";

export interface MissionFieldArgs {
	chunkActive?: boolean;
}
export function makeMissionFields({
	chunkActive
}: MissionFieldArgs = {}) {
	return [
		'_id',
		'name',
		'rate',
		'byDay',
		'dayLength',
		'start',
		'end',
		'desc',
		`chunks (active:${chunkActive}) {
		${chunkFields.join('\n')}
	}`,
		'companyId'
	]
};
