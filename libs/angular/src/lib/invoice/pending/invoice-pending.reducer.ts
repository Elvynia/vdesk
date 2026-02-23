import { Invoice } from "@lv/common";
import { Action, createReducer, on } from "@ngrx/store";
import { authActions } from "../../auth/actions";
import { invoicePendingActions } from "./invoice-pending.action";

const initState = {};

export const invoicePendingReducer = (
	state: Record<string, Invoice> | undefined,
	action: Action
) =>
	createReducer<Record<string, Invoice>>(
		initState,
		on(
			invoicePendingActions.listenPendingMessage,
			(state, { values }) => Object.entries(values).reduce(
				(active, [k, v]) => {
					v ? active[k] = v : delete active[k];
					return active;
				},
				{ ...state }
			)
		),
		on(authActions.logout, () => ({ ...initState }))
	)(state, action);
