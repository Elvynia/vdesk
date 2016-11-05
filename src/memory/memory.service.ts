import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RammService} from '../ramm/ramm.service';
import {Memory} from './memory.class';

@Injectable()
export class MemoryService {
	private headers: Headers;
	private url: String = 'http://localhost:8080/spring';

	constructor(private http: Http) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
	}

	public create(memory: Memory): Observable<Memory> {
		return this.http.post(this.url + '/memory', JSON.stringify(memory), {headers: this.headers})
			.map(response => response.json());
	}

	public read(): Observable<Array<Memory>> {
		return this.http.get(this.url + '/memory')
			.map(response => response.json());
	}

	public update(memory: Memory): Observable<Memory> {
		return this.http.put(this.url + '/memory', JSON.stringify(memory), {headers: this.headers})
			.map(response => response.json());
	}

	public delete(memory: Memory): Observable<Response> {
		return this.http.delete(this.url + '/memory/' + memory.id, {headers: this.headers});
	}
}