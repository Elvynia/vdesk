export class Tag {
	_id: string;
	name: string;
	metadata: any;

	constructor(name?: string, metadata?: any) {
		this.name = name;
		this.metadata = metadata;
	}
}