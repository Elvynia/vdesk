import { EntityEntry } from "../util/entity.type";
import { Invoice } from "./invoice.type";

export type HasInvoicePubSub = {
	invoicePending: EntityEntry<Invoice>[]
};
