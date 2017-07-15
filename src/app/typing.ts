export class Typing {
	static readonly EVENT_TYPING = 0;
	static readonly EVENT_TYPED = 1;

	value: string;
	event: number;

	constructor(value: string, event: number) {
		this.value = value;
		this.event = event;
	}
}
