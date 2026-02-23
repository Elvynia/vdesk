import { Invoice } from "@lv/common";

export interface HasInvoicePendingState {
	invoicesPending: Record<string, Invoice>;
}

export const selectInvoicePending = (state: HasInvoicePendingState) => state.invoicesPending;
