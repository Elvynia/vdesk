import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {RammService} from '../ramm/ramm.service';
import {Tag} from './tag.class';

@Injectable()
export class TagService {
	private headers: Headers;

	constructor(private http: Http) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
	}

	public create(tag: Tag): Observable<Tag> {
		return this.http.post('/ws/ramm/tag', JSON.stringify(tag), {headers: this.headers})
			.map(response => response.json());
	}

	public read(): Observable<Array<Tag>> {
		return this.http.get('/ws/ramm/tag')
			.map(response => response.json());
	}

	public update(tag: Tag): Observable<Tag> {
		return this.http.put('/ws/ramm/tag', JSON.stringify(tag), {headers: this.headers})
			.map(response => response.json());
	}

	public delete(tag: Tag): Observable<Tag> {
		return this.http.delete('ws/ramm/tag/' + tag._id, {headers: this.headers})
			.map(response => response.json());
	}
}