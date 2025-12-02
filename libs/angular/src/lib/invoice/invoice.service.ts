import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice, InvoiceCreate, invoiceFields, InvoiceUpdate } from '@lv/common';
import { ApiConfig } from '../config';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class InvoiceService extends ApiService<Invoice, InvoiceCreate, InvoiceUpdate> {
	get entity(): string {
		return 'invoice';
	}

	constructor(httpClient: HttpClient, private config: ApiConfig) {
		super(httpClient, config);
		this.apiUrl = config.apiUrl + config.apiPath + '/invoice';
	}

	download(id: string) {
		return this.httpClient.get(this.config.apiUrl + '/invoice/print/' + id, {
			observe: 'response',
			responseType: 'blob'
		});
	}

	getFields(): string {
		return invoiceFields.join('\n');
	}
}
