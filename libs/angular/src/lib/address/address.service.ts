import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class AddressService extends ApiService<Address> {
	get entity(): string {
		return 'address';
	}

	constructor(httpClient: HttpClient, config: ApiConfig) {
		super(httpClient, config);
		this.apiUrl = config.apiUrl + config.apiPath + '/address';
	}

	getFields(): string {
		return [
			'city',

			'firstname',

			'lastname',

			'line1',

			'line2',

			'zip',

			'_id',
		].join('\n');
	}
}
