import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, AccountCreate, accountFields, AccountPatch } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root'
})
export class AccountService extends ApiService<Account, AccountCreate, AccountPatch> {

	get entity(): string {
		return 'account';
	}

	constructor(httpClient: HttpClient, config: ApiConfig) {
		super(httpClient, config);
	}

	getFields(): string {
		return accountFields.join('\n');
	}
}
