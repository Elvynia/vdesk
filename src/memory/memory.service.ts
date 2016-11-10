import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Config} from '../config.class';
import {Memory} from './memory.class';

@Injectable()
export class MemoryService {
	private headers: Headers;
	
	constructor(private http: Http, private config: Config) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
	}

	public get(id?: string): Observable<Memory> {
		let url:string = this.config.backendUrl + '/memory';
		if (id) {
			url += '/' + id;
		}
		return this.http.get(url)
			.map((response) => response.json());
	}
}