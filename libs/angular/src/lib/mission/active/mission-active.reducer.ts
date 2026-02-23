import { Mission } from "@lv/common";
import { Action, createReducer, on } from "@ngrx/store";
import { authActions } from "../../auth/actions";
import { missionActiveActions } from "./mission-active.action";

const initState = {};

export const missionActiveReducer = (
	state: Record<string, Mission> | undefined,
	action: Action
) =>
	createReducer<Record<string, Mission>>(
		initState,
		on(
			missionActiveActions.listenActiveMessage,
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
