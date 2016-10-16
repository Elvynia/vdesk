import {Memory} from '../memory/memory.class';
import {Tag} from '../tag/tag.class';

export class Ramm {
	private _memories: Array<Memory>;
	private _tags: Array<Tag>;

	public get memories(): Array<Memory> {
		return this._memories;
	}

	public get tags(): Array<Tag> {
		return this._tags;
	}

	constructor(memories?: Array<Memory>, tagIds?: Array<Tag>) {
		this._memories = memories || new Array<Memory>();
		this._tags = tagIds || new Array<Tag>();
	}

	public getTagById(id: string): Tag {
		let result = null;
		for (var i = this._tags.length - 1; i >= 0; i--) {
			if (this._tags[i]._id === id) {
				result = this._tags[i];
				break;
			}
		}
		return result;
	}

	public setTagById(tag: Tag) {
		for (var i = this._tags.length - 1; i >= 0; i--) {
			if (this._tags[i]._id === tag._id) {
				this._tags[i] = tag;
				break;
			}
		}
	}

	public filterMemories(tags: Array<Tag>): Array<Memory> {
		let filtered = new Array<Memory>();
		if (tags && tags.length > 0) {
			for (var i = this.memories.length - 1; i >= 0; i--) {
				let memory = this.memories[i];
				let found = false;
				if (memory.tags && memory.tags.length > 0) {
					for (var j = memory.tags.length - 1; j >= 0; j--) {
						for (var t = tags.length - 1; t >= 0; t--) {
							let filterTag:any = memory.tags[j];
							if (tags[t]._id === filterTag.$id) {
								filtered.push(memory);
								found = true;
								break;
							}
						}
						if (found) {
							break;
						}
					}
				} else {
					filtered.push(memory);
				}
			}
		} else {
			filtered = this.memories;
		}
		return filtered;
	}
}