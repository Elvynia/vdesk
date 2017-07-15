import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';

import { Typing } from './typing';

@Injectable()
export class TypingService {
	private _typings: BehaviorSubject<Typing>;

	constructor() {
		this._typings = new BehaviorSubject<Typing>(null);
	}

	public typings(debounceTime?: number): Observable<Typing> {
		if (debounceTime && debounceTime > 0) {
			return this.byEvent(Typing.EVENT_TYPING).debounceTime(debounceTime);
		} else {
			return this.byEvent(Typing.EVENT_TYPING);
		}
	}

	public typed(): Observable<Typing> {
		return this.byEvent(Typing.EVENT_TYPED);
	}

	public byEvent(event: number): Observable<Typing> {
		return this._typings.asObservable().filter((typing) => typing.event === event);
	}

	public nextTyping(text: string): void {
		this._typings.next(new Typing(text, Typing.EVENT_TYPING));
	}

	public nextTyped(text: string): void {
		this._typings.next(new Typing(text, Typing.EVENT_TYPED));
	}
}
