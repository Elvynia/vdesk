import { Invoice } from "./invoice.type";

export const sortInvoices = (a: Invoice, b: Invoice) => a.name.localeCompare(b.name);
