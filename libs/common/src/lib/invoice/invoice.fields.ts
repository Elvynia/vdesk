import { invoiceLineFields } from "../invoice-line/invoice-line.fields";

export const invoiceFields = [
	'_id',
	'name',
	'date',
	'estimate',
	'amount',
	'currency',
	'execStart',
	'execEnd',
	'sent',
	'paid',
	'missionId',
	`lines {
		${invoiceLineFields.join('\n')}
	}`
];
