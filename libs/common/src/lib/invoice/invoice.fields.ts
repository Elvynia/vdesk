import { invoiceLineFields } from "../invoice-line/invoice-line.fields";

export const invoiceFields = [
	'_id',
	'name',
	'date',
	'estimate',
	'amount',
	'companyId',
	'currency',
	'execStart',
	'execEnd',
	'sent',
	'paid',
	'missionIds',
	'tax',
	'taxMultiplier',
	`lines {
		${invoiceLineFields.join('\n')}
	}`,
];
