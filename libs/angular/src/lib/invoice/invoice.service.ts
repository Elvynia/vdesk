import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HasInvoicePubSub, Invoice, InvoiceCreate, invoiceFields, InvoiceUpdate } from '@lv/common';
import { ApiConfig } from '../config';
import { SocketService } from '../socket.service';
import { ApiService } from '../util/api.service';

@Injectable({
	providedIn: 'root',
})
export class InvoiceService extends ApiService<Invoice, InvoiceCreate, InvoiceUpdate> {
	get entity(): string {
		return 'invoice';
	}

	constructor(
		httpClient: HttpClient,
		private config: ApiConfig,
		private socketService: SocketService<HasInvoicePubSub>
	) {
		super(httpClient, config);
	}

	download(id: string) {
		return this.httpClient.get(this.config.apiUrl + '/invoice/print/' + id, {
			observe: 'response',
			responseType: 'blob'
		});
	}

	listenPending() {
		return this.socketService.subscribe('invoicePending', `{
			key
			value {
				${this.getFields()}
			}
		}`)
	}

	preview(id: string) {
		return this.httpClient.get(this.config.apiUrl + '/invoice/pdf/' + id, {
			observe: 'response',
			responseType: 'blob'
		});
	}

	getFields(): string {
		return invoiceFields.join('\n');
	}
}
