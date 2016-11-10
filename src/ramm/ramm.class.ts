import {Memory} from '../memory/memory.class';
import {Bubble} from '../bubble/bubble.class';

export class Ramm {
	root: Memory;
	search: Array<Memory>;
	selected: Bubble;

	constructor(root?: Memory, search?: Array<Memory>) {
		this.root = root;
		this.search = search || new Array<Memory>();
	}
}