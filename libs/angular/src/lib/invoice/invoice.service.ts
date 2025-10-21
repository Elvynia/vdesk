import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice, invoiceFields } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class InvoiceService extends ApiService<Invoice> {
	get entity(): string {
		return 'invoice';
	}

	constructor(httpClient: HttpClient, config: ApiConfig) {
		super(httpClient, config);
		this.apiUrl = config.apiUrl + config.apiPath + '/invoice';
	}

	getFields(): string {
		return invoiceFields.join('\n');
	}
}
