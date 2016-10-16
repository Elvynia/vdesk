import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {Ramm} from './ramm.class';
import {Memory} from '../memory/memory.class';
import {Tag} from '../tag/tag.class';

@Injectable()
export class RammService {
	private headers: Headers;
	private memoryMap: Ramm;
	private _events: BehaviorSubject<Ramm>;

	public get events(): Observable<Ramm> {
		return this._events.asObservable();
	}

	constructor(private http: Http) {
		this.memoryMap = new Ramm();
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.http.get('/ws/ramm/memory')
			.map(response => response.json())
			.subscribe({
				next: (memories: Array<Memory>) => memories.forEach((memory) => this.memoryMap.memories.push(memory)),
				error: (error) => console.error('Get memories error : ', error),
				complete: () => this.next()
			});
		this.http.get('/ws/ramm/tag')
			.map(response => response.json())
			.subscribe({
				next: (tags: Array<Tag>) => tags.forEach((tag) => this.memoryMap.tags.push(tag)),
				error: (error) => console.error('Get memories error : ', error),
				complete: () => this.next()
			});
		this._events = new BehaviorSubject<Ramm>(new Ramm());
	}

	public addMemory(memory: Memory) {
		this.http.post('/ws/ramm/memory', JSON.stringify(memory), {headers: this.headers})
			.map(response => response.json())
			.subscribe({
				next: (result) => this.memoryMap.memories.push(result),
				error: (error) => console.error('Post memory error : ', error),
				complete: () => this.next()
			});
	}

	public addTag(tag: Tag) {
		this.http.post('/ws/ramm/tag', JSON.stringify(tag), {headers: this.headers})
			.map(response => response.json())
			.subscribe({
				next: (result) => this.memoryMap.tags.push(result),
				error: (error) => console.error('Post tag error : ', error),
				complete: () => this.next()
			});
	}

	public editTag(tag: Tag) {
		this.http.put('/ws/ramm/tag', JSON.stringify(tag), {headers: this.headers})
			.map(response => response.json())
			.subscribe({
				next: (result) => this.memoryMap.setTagById(result),
				error: (error) => console.error('Put tag error : ', error),
				complete: () => this.next()
			});
	}
	
	public deleteMemory(memory: Memory) {
		this.http.delete('ws/ramm/memory/' + memory._id, {headers: this.headers})
			.subscribe(() => {
				let memories = this.memoryMap.memories;
				for (var i = memories.length - 1; i >= 0; i--) {
					if (memories[i] === memory) {
						memories.splice(i, 1);
					}
				}
				this.next();
			});
	}

	private next() {
		this._events.next(new Ramm(this.memoryMap.memories.slice(0), this.memoryMap.tags.slice(0)));			
	}
}