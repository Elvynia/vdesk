import { CompanyRead } from '../company/company.type';
import { InvoiceLine } from '../invoice-line/invoice-line.type';
import { Mission } from '../mission/mission.type';
import { IEntity } from '../util/entity.type';

export interface Invoice extends IEntity {
	amount: number;

	companyId: string;

	createdOn: Date;

	estimate: boolean;

	execStart: Date;

	execEnd: Date;

	lines: InvoiceLine[];

	missionIds: string[];

	name: string;

	paid?: boolean;

	paymentLimit: Date;

	sent: boolean;

	tax: boolean;

	taxMultiplier?: number;
}

export interface InvoiceRead extends Invoice {

	company: CompanyRead;

	missions: Mission[];
}

export type InvoiceCreate = Omit<Invoice, '_id'>;
export type InvoicePatch = Partial<Omit<Invoice, 'company' | 'missions'>> & IEntity;
export type InvoiceSave = InvoiceCreate | InvoicePatch;

export interface InvoiceState {
	invoices: Record<string, Invoice>;
}

export const selectInvoices = (state: InvoiceState) => state.invoices;

export function makeInvoiceDateExecution(invoice: Invoice) {
	let exec = '';
	if (invoice.execStart.getFullYear() === invoice.execEnd.getFullYear()) {
		const monthStart = invoice.execStart.getMonth() + 1;
		const monthEnd = invoice.execEnd.getMonth() + 1;
		if (monthStart === monthEnd) {
			exec += monthStart;
		} else {
			exec += monthStart + '-' + monthEnd;
		}
		return exec + '/' + invoice.execStart.getFullYear();
	} else {
		return invoice.execStart.toLocaleDateString()
			+ ' - ' + invoice.execEnd.toLocaleDateString();
	}
}
