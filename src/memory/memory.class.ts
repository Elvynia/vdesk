import {Tag} from '../tag/tag.class';

export class Memory {
	_id: string;
	content: string;
	tags: Array<Tag>;

	constructor(content?: string, tags?: Array<Tag>) {
		this.content = content;
		this.tags = tags || new Array<Tag>();
	}
}