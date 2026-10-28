import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyCreate, companyFields, CompanyPatch, CompanyRead } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class CompanyService extends ApiService<CompanyRead, CompanyCreate, CompanyPatch> {
	get entity(): string {
		return 'company';
	}

	constructor(httpClient: HttpClient, config: ApiConfig) {
		super(httpClient, config);
	}

	getFields(): string {
		return companyFields.join('\n');
	}
}
