import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {Ramm} from './ramm.class';
import {Memory} from '../memory/memory.class';
import {MemoryService} from '../memory/memory.service';
import {Tag} from '../tag/tag.class';
import {TagService} from '../tag/tag.service';

@Injectable()
export class RammService {
	private memoryMap: Ramm;
	private _changes: BehaviorSubject<Ramm>;

	public get changes(): Observable<Ramm> {
		return this._changes.asObservable();
	}

	constructor(private memoryService: MemoryService, private tagService: TagService) {
		this.memoryMap = new Ramm();
		this._changes = new BehaviorSubject<Ramm>(new Ramm());
	}

	public getMemories() {
		this.memoryService.read().subscribe({
			next: (memories: Array<Memory>) => memories.forEach((memory) => this.memoryMap.memories.push(memory)),
			error: (error) => console.error('Get memories error : ', error),
			complete: () => this.next()
		});
	}

	public getTags() {
		this.tagService.read().subscribe({
				next: (tags: Array<Tag>) => tags.forEach((tag) => this.memoryMap.tags.push(tag)),
				error: (error) => console.error('Get tags error : ', error),
				complete: () => this.next()
			});
	}

	public addMemory(memory: Memory) {
		this.memoryService.create(memory).subscribe({
				next: (result) => this.memoryMap.memories.push(result),
				error: (error) => console.error('Post memory error : ', error),
				complete: () => this.next()
			});
	}

	public addTag(tag: Tag) {
		this.tagService.create(tag).subscribe({
			next: (result) => this.memoryMap.tags.push(result),
			error: (error) => console.error('Post tag error : ', error),
			complete: () => this.next()
		});
	}

	public editTag(tag: Tag) {
		this.tagService.update(tag).subscribe({
			next: (result) => this.memoryMap.updateTag(result),
			error: (error) => console.error('Put tag error : ', error),
			complete: () => this.next()
		});
	}

	public deleteMemory(memory: Memory) {
		this.memoryService.delete(memory).subscribe(() => {
			let memories = this.memoryMap.memories;
			for (var i = memories.length - 1; i >= 0; i--) {
				if (memories[i] === memory) {
					memories.splice(i, 1);
				}
			}
			this.next();
		});
	}

	public deleteTag(tag: Tag) {
		this.tagService.delete(tag).subscribe(() => {
			let tags = this.memoryMap.tags;
			for (var i = tags.length - 1; i >= 0; i--) {
				if (tags[i] === tag) {
					tags.splice(i, 1);
				}
			}
			this.next();
		});
	}

	private next() {
		this._changes.next(new Ramm(this.memoryMap.memories.slice(0), this.memoryMap.tags.slice(0)));			
	}
}