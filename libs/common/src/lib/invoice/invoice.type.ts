import { InvoiceLine } from '../invoice-line/invoice-line.type';
import { IEntity } from '../util/entity.type';

export interface Invoice extends IEntity {
	name: string;

	date: Date;

	estimate: boolean;

	amount: number;

	currency: string;

	execStart: Date;

	execEnd: Date;

	sent: boolean;

	paid?: boolean;

	tax: boolean;

	taxMultiplier?: number;

	missionId: string;

	lines: InvoiceLine[];
}

export interface InvoiceState {
	invoices: Record<string, Invoice>;
}

export const selectInvoices = (state: InvoiceState) => state.invoices;
