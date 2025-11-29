import { invoiceLineFields } from "../invoice-line/invoice-line.fields";

export const invoiceFields = [
	'_id',
	'amount',
	'companyId',
	'createdOn',
	'estimate',
	'execStart',
	'execEnd',
	`lines {
		${invoiceLineFields.join('\n')}
	}`,
	'missionIds',
	'name',
	'sent',
	'paid',
	'paymentLimit',
	'tax',
	'taxMultiplier',
];
