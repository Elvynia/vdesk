import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RammService} from '../ramm/ramm.service';
import {Memory} from './memory.class';
import {Config} from '../config.class';

@Injectable()
export class MemoryService {
	private headers: Headers;

	constructor(private http: Http, private config: Config) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
	}

	public create(memory: Memory): Observable<Memory> {
		return this.http.post(this.config.backendUrl + '/memory', JSON.stringify(memory), {headers: this.headers})
			.map(response => response.json());
	}

	public read(): Observable<Array<Memory>> {
		return this.http.get(this.config.backendUrl + '/memory')
			.map(response => response.json());
	}

	public update(memory: Memory): Observable<Memory> {
		return this.http.put(this.config.backendUrl + '/memory', JSON.stringify(memory), {headers: this.headers})
			.map(response => response.json());
	}

	public delete(memory: Memory): Observable<Response> {
		return this.http.delete(this.config.backendUrl + '/memory/' + memory.id, {headers: this.headers});
	}
}