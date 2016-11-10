import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {Ramm} from './ramm.class';
import {MemoryService} from '../memory/memory.service';

@Injectable()
export class RammService {
	readonly ramm: Ramm;

	constructor(private memoryService: MemoryService) {
		this.ramm = new Ramm();
	}

	public initialize() {
		this.memoryService.get().subscribe((memory) => this.ramm.root = memory);
	}
}