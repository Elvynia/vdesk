import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RammService} from '../ramm/ramm.service';
import {Tag} from './tag.class';
import {Config} from '../config.class';

@Injectable()
export class TagService {
	private headers: Headers;

	constructor(private http: Http, private config: Config) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
	}

	public create(tag: Tag): Observable<Tag> {
		return this.http.post(this.config.backendUrl + '/tag', JSON.stringify(tag), {headers: this.headers})
			.map(response => response.json());
	}

	public read(): Observable<Array<Tag>> {
		return this.http.get(this.config.backendUrl + '/tag')
			.map(response => response.json());
	}

	public update(tag: Tag): Observable<Tag> {
		return this.http.put(this.config.backendUrl + '/tag', JSON.stringify(tag), {headers: this.headers})
			.map(response => response.json());
	}

	public delete(tag: Tag): Observable<Response> {
		return this.http.delete(this.config.backendUrl + '/tag/' + tag.id, {headers: this.headers});
	}
}