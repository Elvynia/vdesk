import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, accountFields } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root'
})
export class AccountService extends ApiService<Account> {

	get entity(): string {
		return 'account';
	}

	constructor(httpClient: HttpClient, config: ApiConfig) {
		super(httpClient, config);
		this.apiUrl = config.apiUrl + config.apiPath + '/account';
	}

	getFields(): string {
		return accountFields.join('\n');
	}

	search(keywords: string) {
		return this.httpClient.get<Account[]>(this.apiUrl + '/search', {
			params: new HttpParams().append('keywords', keywords)
		});
	}

	policyExists(policyNumber: string, valueId?: string) {
		let params = new HttpParams()
			.append('policyNumber', policyNumber);
		if (valueId) {
			params = params.append('estateId', valueId)
		}
		return this.httpClient.get<Account>(this.apiUrl + '/policy/exists', { params });
	}
}
