import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyType, companyTypeFields } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class CompanyTypeService extends ApiService<CompanyType> {
	get entity(): string {
		return 'companyType';
	}

	constructor(httpClient: HttpClient, config: ApiConfig) {
		super(httpClient, config);
		this.apiUrl = config.apiUrl + config.apiPath + '/company-type';
	}

	getFields(): string {
		return companyTypeFields.join('\n');
	}
}
