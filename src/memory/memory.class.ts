import {Bubble} from '../bubble/bubble.class';

export class Memory {
	root: Bubble;
	children: Array<Bubble>;

	constructor(root: Bubble, children?: Array<Bubble>) {
		this.root = root;
		this.children = children || new Array<Bubble>();
	}
}