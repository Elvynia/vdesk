import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RammService} from '../ramm/ramm.service';
import {Memory} from './memory.class';

@Injectable()
export class MemoryService {
	private headers: Headers;

	constructor(private http: Http) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
	}

	public create(memory: Memory): Observable<Memory> {
		return this.http.post('/ws/ramm/memory', JSON.stringify(memory), {headers: this.headers})
			.map(response => response.json());
	}

	public read(): Observable<Array<Memory>> {
		return this.http.get('/ws/ramm/memory')
			.map(response => response.json());
	}

	public update(memory: Memory): Observable<Memory> {
		return this.http.put('ws/ramm/memory', JSON.stringify(memory), {headers: this.headers})
			.map(response => response.json());
	}

	public delete(memory: Memory): Observable<Memory> {
		return this.http.delete('ws/ramm/memory/' + memory._id, {headers: this.headers})
			.map(response => response.json());
	}
}