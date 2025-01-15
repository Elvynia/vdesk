import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address, addressFields } from '@lv/common';
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
		return addressFields.join('\n');
	}
}
